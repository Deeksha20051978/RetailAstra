package com.retailastra.controller;

import com.retailastra.dto.CheckoutRequest;
import com.retailastra.dto.CheckoutResponse;
import com.retailastra.service.CheckoutService;
import com.retailastra.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping
    public ApiResponse<CheckoutResponse> checkout(@RequestBody CheckoutRequest request) {
        return ApiResponse.success(checkoutService.checkout(request));
    }
}