package com.retailastra.controller;

import com.retailastra.agents.ChatAgent;
import com.retailastra.dto.ChatRequest;
import com.retailastra.dto.ChatResponse;
import com.retailastra.util.ApiResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatAgent chatAgent;

    public ChatController(ChatAgent chatAgent) {
        this.chatAgent = chatAgent;
    }

    @PostMapping
    public ApiResponse<ChatResponse> chat(@RequestBody ChatRequest request) {
        String reply = chatAgent.handleQuery(request.getMessage());
        return ApiResponse.success(new ChatResponse(reply));
    }
}