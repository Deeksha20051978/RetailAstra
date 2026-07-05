package com.retailastra.controller;

import com.retailastra.entity.Inventory;
import com.retailastra.service.InventoryService;
import com.retailastra.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ApiResponse<List<Inventory>> getInventory() {
        return ApiResponse.success(inventoryService.getAllInventory());
    }

    @PutMapping
    public ApiResponse<Inventory> updateInventory(@RequestBody Inventory inventory) {
        return ApiResponse.success(inventoryService.updateInventory(inventory));
    }
}