package com.retailastra.service;

import com.retailastra.entity.Inventory;
import com.retailastra.entity.Product;
import com.retailastra.exception.OutOfStockException;
import com.retailastra.repository.InventoryRepository;
import com.retailastra.util.Constants;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public boolean isAvailable(Product product, int quantity) {
        return product.getStock() != null && product.getStock() >= quantity;
    }

    public void reduceStock(Product product, int quantity) {
        if (!isAvailable(product, quantity)) {
            throw new OutOfStockException("Insufficient stock for product: " + product.getName());
        }
        product.setStock(product.getStock() - quantity);
    }

    public List<Inventory> getLowStockAlerts() {
        return inventoryRepository.findByCurrentStockLessThanEqual(Constants.LOW_STOCK_THRESHOLD);
    }

    public Inventory updateInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }
}