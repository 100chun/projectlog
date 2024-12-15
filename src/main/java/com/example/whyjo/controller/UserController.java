package com.example.whyjo.controller;

import com.example.whyjo.domain.dto.UserDto;
import com.example.whyjo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/checkId/{userId}")
    public ResponseEntity<Boolean> checkDuplicateId(@PathVariable String userId) {
        boolean isDuplicate = userService.checkDuplicateId(userId);
        return ResponseEntity.ok(isDuplicate);
    }
    
    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody UserDto request) {
        userService.register(request);
        return ResponseEntity.ok().build();
    }
} 