package com.neki.gerenciadoreventos.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.neki.gerenciadoreventos.dto.AdminRequestDto;
import com.neki.gerenciadoreventos.dto.AdminResponseDto;
import com.neki.gerenciadoreventos.dto.LoginRequestDto;
import com.neki.gerenciadoreventos.service.AdminService;

@CrossOrigin(origins = "http://localhost:8088")
@RestController
@RequestMapping("/administradores")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<AdminResponseDto> registrarAdmin(@RequestBody AdminRequestDto adminRequestDto) {
        AdminResponseDto responseDto = adminService.registrarAdministrador(adminRequestDto);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            adminService.loginAdministrador(loginRequestDto);
            return ResponseEntity.ok("Login bem-sucedido!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}