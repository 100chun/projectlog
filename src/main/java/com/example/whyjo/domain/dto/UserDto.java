package com.example.whyjo.domain.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto {
    @NotBlank(message = "아이디는 필수 입력값입니다")
    @Pattern(regexp = "^[A-Za-z0-9]{6,16}$", message = "아이디는 6~16자의 영문 또는 숫자여야 합니다")
    private String userId;

    @NotBlank(message = "비밀번호는 필수 입력값입니다")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d!@#$%^&*(),.?\":{}|<>]{10,}$",
            message = "비밀번호는 10자 이상의 영문/숫자/특수문자 조합이어야 합니다")
    private String password;

    @NotBlank(message = "이름은 필수 입력값입니다")
    private String name;

    @NotBlank(message = "이메일은 필수 입력값입니다")
    @Email(message = "올바른 이메일 형식이 아닙니다")
    private String email;

    @NotBlank(message = "전화번호는 필수 입력값��니다")
    @Pattern(regexp = "^\\d{10,11}$", message = "올바른 전화번호 형식이 아닙니다")
    private String phone;

    private Address address;
    private MarketingConsent marketingConsent;

    private String gender;
    private String birthDate;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class Address {
        private String zipCode;
        private String address;
        private String addressDetail;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @ToString
    public static class MarketingConsent {
        private boolean smsConsent;
        private boolean emailConsent;
    }
} 