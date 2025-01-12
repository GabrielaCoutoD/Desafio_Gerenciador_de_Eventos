package com.neki.gerenciadoreventos.service;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.neki.gerenciadoreventos.dto.AdminRequestDto;
import com.neki.gerenciadoreventos.dto.AdminResponseDto;
import com.neki.gerenciadoreventos.dto.EventoRequestDto;
import com.neki.gerenciadoreventos.dto.EventoResponseDto;
import com.neki.gerenciadoreventos.dto.LoginRequestDto;
import com.neki.gerenciadoreventos.model.Administrador;
import com.neki.gerenciadoreventos.model.Evento;
import com.neki.gerenciadoreventos.repository.AdminRepository;
import com.neki.gerenciadoreventos.repository.EventoRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EventoRepository eventoRepository;

    public AdminResponseDto registrarAdministrador(AdminRequestDto adminRequestDto) {
        if (adminRepository.findByEmail(adminRequestDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado!");
        }

        Administrador administrador = new Administrador();
        administrador.setNome(adminRequestDto.getNome());
        administrador.setEmail(adminRequestDto.getEmail());
        administrador.setSenha(BCrypt.hashpw(adminRequestDto.getSenha(), BCrypt.gensalt()));

        List<Evento> eventos = adminRequestDto.getEventos().stream().map(eventoDto -> {
            Evento evento = new Evento();
            evento.setNome(eventoDto.getNome());
            evento.setData(eventoDto.getData());
            evento.setLocalizacao(eventoDto.getLocalizacao());
            evento.setImagem(eventoDto.getImagem());
            evento.setAdministrador(administrador);
            return evento;
        }).toList();

        administrador.setEventos(eventos);

        Administrador savedAdmin = adminRepository.save(administrador);

        List<EventoResponseDto> eventoDtos = savedAdmin.getEventos().stream()
            .map(evento -> new EventoResponseDto(
                evento.getId(),
                evento.getNome(),
                evento.getData(),
                evento.getLocalizacao(),
                evento.getImagem()))
            .toList();

        return new AdminResponseDto(savedAdmin.getId(), savedAdmin.getNome(), savedAdmin.getEmail(), eventoDtos);
    }


    public void loginAdministrador(LoginRequestDto loginRequestDto) {
        Administrador existingAdmin = adminRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas!"));

        if (!BCrypt.checkpw(loginRequestDto.getSenha(), existingAdmin.getSenha())) {
            throw new RuntimeException("Credenciais inválidas!");
        }

        System.out.println("Login bem-sucedido para o admin: " + existingAdmin.getEmail());
    }
}
