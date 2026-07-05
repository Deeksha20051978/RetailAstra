package com.retailastra.agents;

import com.retailastra.entity.Product;
import com.retailastra.repository.ProductRepository;
import com.retailastra.service.AIService;
import com.retailastra.util.PromptBuilder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class RecommendationAgent {

    private final AIService aiService;
    private final ProductRepository productRepository;

    public RecommendationAgent(AIService aiService, ProductRepository productRepository) {
        this.aiService = aiService;
        this.productRepository = productRepository;
    }

    public List<Product> recommend(Product currentProduct) {
        List<Product> catalog = productRepository.findByCategoryIgnoreCase(currentProduct.getCategory());

        if (catalog.isEmpty()) {
            catalog = productRepository.findAll();
        }

        String prompt = PromptBuilder.buildRecommendationPrompt(currentProduct, catalog);
        String aiResponse = aiService.generateContent(prompt);

        List<String> names = Arrays.stream(aiResponse.split(","))
                .map(String::trim)
                .collect(Collectors.toList());

        return catalog.stream()
                .filter(p -> names.stream().anyMatch(n -> p.getName().equalsIgnoreCase(n)))
                .collect(Collectors.toList());
    }
}