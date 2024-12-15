package com.example.whyjo.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class MainController {

    @GetMapping("/api/data")
    public String test() {
        log.info("api요청");
        return "Hello, world!";
    }
}

