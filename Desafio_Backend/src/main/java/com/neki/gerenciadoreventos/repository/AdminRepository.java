package com.neki.gerenciadoreventos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.neki.gerenciadoreventos.model.Administrador;

public interface AdminRepository extends JpaRepository<Administrador, Long> {
    Optional<Administrador> findByEmail(String email);
}

