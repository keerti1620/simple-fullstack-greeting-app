package com.example.simpleapp.controller;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*") // Enable CORS as per requirement
public class GreetController {

    @PostMapping("/greet")
    public Map<String, String> greet(@RequestBody Map<String, String> request) {
        String name = request.get("name");
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome, " + (name != null ? name : "Guest"));
        return response;
    }
}
