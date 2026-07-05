package com.retailastra.agents;

import com.retailastra.entity.Product;
import com.retailastra.service.InventoryService;
import org.springframework.stereotype.Component;

@Component
public class InventoryAgent {

    private final InventoryService inventoryService;

    public InventoryAgent(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    public void processInventory(Product product, int quantity) {
        inventoryService.reduceStock(product, quantity);
    }
}