package com.retailastra.controller;

import com.retailastra.service.DashboardService;
import com.retailastra.util.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public ApiResponse<Map<String, Object>> getDashboard() {
        return ApiResponse.success(dashboardService.getDashboardStats());
    }
}