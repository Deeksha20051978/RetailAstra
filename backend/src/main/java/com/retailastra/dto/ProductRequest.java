package com.retailastra.dto;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String brand;
    private String category;
    private Double price;
    private Integer stock;
    private String description;
    private String imageUrl;
}