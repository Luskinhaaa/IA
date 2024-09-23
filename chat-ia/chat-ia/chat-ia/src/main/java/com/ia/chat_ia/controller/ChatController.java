package com.ia.chat_ia.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @PostMapping
    public Response getResponse(@RequestBody Request request) {
        String userMessage = request.getMessage();
        String aiResponse = "Resposta da IA para: " + userMessage;
        return new Response(aiResponse);
    }

    public static class Request {
        private String message;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class Response {
        private String response;

        public Response(String response) {
            this.response = response;
        }

        public String getResponse() {
            return response;
        }
    }
}
