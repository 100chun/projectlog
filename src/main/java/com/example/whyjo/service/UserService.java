package com.example.whyjo.service;

import com.example.whyjo.domain.dto.UserDto;
import com.example.whyjo.domain.entity.User;
import com.example.whyjo.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public boolean checkDuplicateId(String userId) {
        return userRepository.existsByUserId(userId);
    }
    
    @Transactional
    public void register(UserDto userDto) {
        // 아이디 중복 체크
        if (userRepository.existsByUserId(userDto.getUserId())) {
            throw new IllegalStateException("이미 존재하는 아이디입니다.");
        }

        // User 엔티티 생성 및 저장
        User user = User.builder()
                .userId(userDto.getUserId())
                .password(userDto.getPassword())  //암호화 필요
                .name(userDto.getName())
                .email(userDto.getEmail())
                .phone(userDto.getPhone())
                .gender(userDto.getGender())
                .birthDate(userDto.getBirthDate())
                .build();
        
         // Address 설정
        User.Address address = User.Address.builder()
                .zipCode(userDto.getAddress().getZipCode())
                .address(userDto.getAddress().getAddress())
                .addressDetail(userDto.getAddress().getAddressDetail())
                .build();
        user.setAddress(address);

        // MarketingConsent 설정 
        User.MarketingConsent consent = User.MarketingConsent.builder()
                .smsConsent(userDto.getMarketingConsent().isSmsConsent())
                .emailConsent(userDto.getMarketingConsent().isEmailConsent())
                .build();
        user.setMarketingConsent(consent);

        userRepository.save(user);
    }

    // 비밀 번호 확인
    public boolean checkPassword(String userId, String password) {
        User user = userRepository.findByUserId(userId);
        return user!=null && user.getPassword().equals(password);
    }
    // 권한 확인
    public boolean checkRole(String userId) {
        User user = userRepository.findRoleByUserId(userId);
        String role = user.getRole();
        System.out.println(role);
        if (role.equals("ROLE_SELLER") || role.equals("ROLE_ADMIN"))
            return true;
        else
            return false;
    }
} 