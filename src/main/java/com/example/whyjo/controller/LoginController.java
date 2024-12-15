package com.example.whyjo.controller;

import com.example.whyjo.domain.entity.Login;
import com.example.whyjo.domain.entity.LoginRem;
import com.example.whyjo.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ServletComponentScan
@RestController
@RequestMapping("/user/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // React 클라이언트와 통신 지원
public class LoginController {

    @Autowired
    private UserService userService;

    // 로그인 처리
    @PostMapping("/login")
    public ResponseEntity<?> loginCheck(@RequestBody Login login, HttpSession session) {
        System.out.println("POST /login");
        String userId = login.getUserId();
        String password = login.getPassword();
        
        if (userService.checkPassword(userId, password)) {
            session.setAttribute("userId", userId); // 세션에 사용자 ID 저장
            System.out.println("[LC] Login Success " + session.getId());
            return ResponseEntity.ok("로그인이 성공적으로 완료됐습니다.");
        } else {
            System.out.println("[LC] login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 중 오류가 발생습했니다.");
        }
    }

    // 일반 session Id 확인
    @GetMapping("/session")
    public ResponseEntity<?> sessionCheck(HttpSession session) {
        System.out.println("[LC] GET /session-id");

        // 세션 확인 로직
        if (session == null) {
            System.out.println("[LC] No Session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No Active session");
        }

        String userId = (String) session.getAttribute("userId");
        if (userId != null) {
            System.out.println("[LC] Session Success " + session.getId());
            return ResponseEntity.ok(userId);
        } else {
            System.out.println("[LC] Session Fail " + session.getId());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("NoMatch Session");
        }
    }

    // rememberMe Id 확인
    @PostMapping("/remember")
    public ResponseEntity<?> rememberCheck(@RequestBody LoginRem login) {
        System.out.println("POST /remember");
        String userId = login.getUserId();
        String password = login.getPassword();

        // 사용자 인증 로직
        if (userService.checkPassword(userId, password)) {
            System.out.println("[LC] RememberMe Success" + userId);
            return ResponseEntity.ok(userId);
        } else {
            System.out.println("[LC]  RememberMe Fail");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("NoMatch RememberMe");
        }
    }

    // id로 권한 확인
    @PostMapping("/role")
    public ResponseEntity<?> roleCheck(@RequestBody Login login) {
        System.out.println("POST /role");
        String userId = login.getUserId();

        // 사용자 권한 확인 로직
        if (userService.checkRole(userId)) {
            System.out.println("[LC] Role check success for user: " + userId);
            return ResponseEntity.ok("권한 확인 성공");
        } else {
            System.out.println("[LC] Role check failed for user: " + userId);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("권한 부족");
        }
    }

}
