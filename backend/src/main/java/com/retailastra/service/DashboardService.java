package com.retailastra.service;

import com.retailastra.repository.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final InventoryRepository inventoryRepository;

    public DashboardService(OrderRepository orderRepository,
                            ProductRepository productRepository,
                            CustomerRepository customerRepository,
                            InventoryRepository inventoryRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.customerRepository = customerRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        double totalRevenue = orderRepository.findAll().stream()
                .filter(o -> o.getTotalAmount() != null)
                .mapToDouble(o -> o.getTotalAmount())
                .sum();

        stats.put("totalRevenue", totalRevenue);
        stats.put("totalOrders", orderRepository.count());
        stats.put("totalProducts", productRepository.count());
        stats.put("totalCustomers", customerRepository.count());
        stats.put("lowStockCount", inventoryRepository.findByCurrentStockLessThanEqual(5).size());

        return stats;
    }
}