package com.retailastra.controller;

import com.retailastra.agents.RecommendationAgent;
import com.retailastra.entity.Product;
import com.retailastra.exception.ProductNotFoundException;
import com.retailastra.repository.ProductRepository;
import com.retailastra.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recommendations")
public class RecommendationController {

    private final RecommendationAgent recommendationAgent;
    private final ProductRepository productRepository;

    public RecommendationController(RecommendationAgent recommendationAgent,
                                    ProductRepository productRepository) {
        this.recommendationAgent = recommendationAgent;
        this.productRepository = productRepository;
    }

    @GetMapping("/{customerId}")
    public ApiResponse<List<Product>> getRecommendations(@PathVariable Long customerId,
                                                         @RequestParam Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("Product not found"));
        return ApiResponse.success(recommendationAgent.recommend(product));
    }
}