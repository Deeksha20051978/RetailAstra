package com.retailastra.agents;

import com.retailastra.entity.Product;
import com.retailastra.repository.ProductRepository;
import com.retailastra.service.AIService;
import com.retailastra.util.PromptBuilder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChatAgent {

    private final AIService aiService;
    private final ProductRepository productRepository;

    public ChatAgent(AIService aiService, ProductRepository productRepository) {
        this.aiService = aiService;
        this.productRepository = productRepository;
    }

    public String handleQuery(String userMessage) {
        List<Product> catalog = productRepository.findAll();
        String prompt = PromptBuilder.buildChatPrompt(userMessage, catalog);
        return aiService.generateContent(prompt);
    }
}