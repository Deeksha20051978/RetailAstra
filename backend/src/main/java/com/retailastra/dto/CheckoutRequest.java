package com.retailastra.dto;

import lombok.Data;
import java.util.List;

@Data
public class CheckoutRequest {
    private Long customerId;
    private List<CartItemDto> cartItems;
    private String couponCode;
}