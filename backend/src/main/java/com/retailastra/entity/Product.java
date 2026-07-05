package com.retailastra.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brand;
    private String category;
    private Double price;
    private Integer stock;

    @Column(length = 1000)
    private String description;

    private String imageUrl;
}