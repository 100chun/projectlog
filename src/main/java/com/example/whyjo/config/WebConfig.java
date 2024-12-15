package com.example.whyjo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")  // 모든 엔드포인트에 대해
                .allowedOrigins("http://localhost:3000")  // React 앱의 URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메소드들
                .allowedHeaders("*");  // 모든 헤더를 허용
    }
}
