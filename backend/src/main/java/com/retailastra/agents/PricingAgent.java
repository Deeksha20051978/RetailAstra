package com.retailastra.agents;

import org.springframework.stereotype.Component;

@Component
public class PricingAgent {

    public double[] calculateFinalPrice(double subtotal, String couponCode, int loyaltyPoints) {
        double discount = 0.0;

        if (couponCode != null && !couponCode.isBlank()) {
            if (couponCode.equalsIgnoreCase("FESTIVAL10")) {
                discount += subtotal * 0.10;
            } else if (couponCode.equalsIgnoreCase("WELCOME50")) {
                discount += 50;
            }
        }

        double loyaltyDiscount = Math.min(loyaltyPoints, subtotal * 0.20);
        discount += loyaltyDiscount;

        double finalAmount = Math.max(subtotal - discount, 0);

        return new double[] { finalAmount, discount };
    }
}