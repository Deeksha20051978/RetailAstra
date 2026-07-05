package com.retailastra.agents;

import com.retailastra.entity.Customer;
import com.retailastra.util.Constants;
import org.springframework.stereotype.Component;

@Component
public class LoyaltyAgent {

    public int rewardCustomer(Customer customer, double orderAmount) {
        int earnedPoints = (int) Math.round(orderAmount * Constants.LOYALTY_POINT_RATE * 100);
        customer.setLoyaltyPoints(customer.getLoyaltyPoints() + earnedPoints);
        return earnedPoints;
    }
}