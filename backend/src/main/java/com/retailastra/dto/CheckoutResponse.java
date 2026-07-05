package com.retailastra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckoutResponse {
    private Long orderId;
    private Double totalAmount;
    private Double discount;
    private Integer loyaltyEarned;
    private List<ProductResponse> recommendations;
}