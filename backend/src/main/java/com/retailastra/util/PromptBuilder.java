package com.retailastra.util;

import com.retailastra.entity.Product;
import java.util.List;
import java.util.stream.Collectors;

public class PromptBuilder {

    public static String buildRecommendationPrompt(Product currentProduct, List<Product> catalog) {
        String catalogText = catalog.stream()
                .map(p -> p.getName() + " (" + p.getCategory() + ", ₹" + p.getPrice() + ")")
                .collect(Collectors.joining(", "));

        return "A customer is viewing: " + currentProduct.getName() +
                " in category " + currentProduct.getCategory() +
                ". From this catalog: [" + catalogText + "], " +
                "suggest 3 related products by name only, comma separated, no explanation.";
    }

    public static String buildChatPrompt(String userMessage, List<Product> catalog) {
        String catalogText = catalog.stream()
                .map(p -> p.getName() + " - ₹" + p.getPrice() + " (" + p.getCategory() + ", stock: " + p.getStock() + ")")
                .collect(Collectors.joining("\n"));

        return "You are a retail shopping assistant. Here is the product catalog:\n" +
                catalogText +
                "\n\nCustomer question: " + userMessage +
                "\n\nAnswer helpfully and concisely based only on the catalog above.";
    }
}