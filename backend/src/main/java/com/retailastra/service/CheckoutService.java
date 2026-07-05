package com.retailastra.service;

import com.retailastra.agents.AgentOrchestrator;
import com.retailastra.dto.CheckoutRequest;
import com.retailastra.dto.CheckoutResponse;
import com.retailastra.exception.OrderException;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {

    private final AgentOrchestrator agentOrchestrator;

    public CheckoutService(AgentOrchestrator agentOrchestrator) {
        this.agentOrchestrator = agentOrchestrator;
    }

    public CheckoutResponse checkout(CheckoutRequest request) {
        if (request.getCartItems() == null || request.getCartItems().isEmpty()) {
            throw new OrderException("Cart is empty");
        }
        return agentOrchestrator.processCheckout(request);
    }
}