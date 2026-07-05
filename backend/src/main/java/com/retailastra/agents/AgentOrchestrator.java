package com.retailastra.agents;

import com.retailastra.dto.*;
import com.retailastra.entity.*;
import com.retailastra.exception.OrderException;
import com.retailastra.repository.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class AgentOrchestrator {

    private final PricingAgent pricingAgent;
    private final InventoryAgent inventoryAgent;
    private final LoyaltyAgent loyaltyAgent;
    private final RecommendationAgent recommendationAgent;

    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public AgentOrchestrator(PricingAgent pricingAgent,
                             InventoryAgent inventoryAgent,
                             LoyaltyAgent loyaltyAgent,
                             RecommendationAgent recommendationAgent,
                             ProductRepository productRepository,
                             CustomerRepository customerRepository,
                             OrderRepository orderRepository,
                             OrderItemRepository orderItemRepository) {
        this.pricingAgent = pricingAgent;
        this.inventoryAgent = inventoryAgent;
        this.loyaltyAgent = loyaltyAgent;
        this.recommendationAgent = recommendationAgent;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    public CheckoutResponse processCheckout(CheckoutRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new OrderException("Customer not found"));

        double subtotal = 0.0;
        for (CartItemDto item : request.getCartItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new OrderException("Product not found: " + item.getProductId()));
            subtotal += product.getPrice() * item.getQuantity();
        }

        double[] pricingResult = pricingAgent.calculateFinalPrice(
                subtotal, request.getCouponCode(), customer.getLoyaltyPoints());
        double finalAmount = pricingResult[0];
        double discount = pricingResult[1];

        for (CartItemDto item : request.getCartItems()) {
            Product product = productRepository.findById(item.getProductId()).get();
            inventoryAgent.processInventory(product, item.getQuantity());
            productRepository.save(product);
        }

        Order order = new Order();
        order.setCustomer(customer);
        order.setTotalAmount(finalAmount);
        order.setStatus("PLACED");
        Order savedOrder = orderRepository.save(order);

        for (CartItemDto item : request.getCartItems()) {
            Product product = productRepository.findById(item.getProductId()).get();
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItemRepository.save(orderItem);
        }

        int loyaltyEarned = loyaltyAgent.rewardCustomer(customer, finalAmount);
        customerRepository.save(customer);

        List<Product> recommended = new ArrayList<>();
        if (!request.getCartItems().isEmpty()) {
            Product firstProduct = productRepository.findById(
                    request.getCartItems().get(0).getProductId()).get();
            recommended = recommendationAgent.recommend(firstProduct);
        }

        List<ProductResponse> recommendationResponses = recommended.stream()
                .map(p -> new ProductResponse(p.getId(), p.getName(), p.getPrice(), p.getStock(), p.getImageUrl()))
                .collect(Collectors.toList());

        return new CheckoutResponse(
                savedOrder.getId(),
                finalAmount,
                discount,
                loyaltyEarned,
                recommendationResponses
        );
    }
}