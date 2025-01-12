package com.neki.gerenciadoreventos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.neki.gerenciadoreventos.model.Evento;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByAdministradorId(Long adminId);
}

