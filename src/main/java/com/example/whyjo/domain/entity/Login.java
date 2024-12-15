package com.example.whyjo.domain.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Login {
    @Id
    private String userId;
    private String password;
}
