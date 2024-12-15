package com.example.whyjo.domain.repository;

import com.example.whyjo.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserId(String userId);
    User findByUserId(String userId);
    User findRoleByUserId(String userId);
} 