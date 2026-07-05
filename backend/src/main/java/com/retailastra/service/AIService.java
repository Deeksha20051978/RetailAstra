package com.retailastra.service;

import com.retailastra.config.GeminiConfig;
import com.retailastra.exception.ChatException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class AIService {

    private final WebClient geminiWebClient;
    private final GeminiConfig geminiConfig;

    @Value("${gemini.api.key}")
    private String apiKey;

    public AIService(WebClient geminiWebClient, GeminiConfig geminiConfig) {
        this.geminiWebClient = geminiWebClient;
        this.geminiConfig = geminiConfig;
    }

    public String generateContent(String prompt) {
        try {
            Map<String, Object> requestBody = Map.of(
                    "contents", new Object[] {
                            Map.of("parts", new Object[] { Map.of("text", prompt) })
                    }
            );

            Map response = geminiWebClient.post()
                    .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            return extractText(response);

        } catch (Exception e) {
            throw new ChatException("Failed to get AI response: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    private String extractText(Map response) {
        try {
            var candidates = (java.util.List<Map>) response.get("candidates");
            var content = (Map) candidates.get(0).get("content");
            var parts = (java.util.List<Map>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return "Sorry, I couldn't process that right now.";
        }
    }
}