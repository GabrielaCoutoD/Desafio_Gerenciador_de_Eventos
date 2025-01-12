package com.neki.gerenciadoreventos.dto;

import java.util.List;

public class AdminResponseDto {

    private Long id;
    private String nome;
    private String email;
    private List<EventoResponseDto> eventos;

    public AdminResponseDto(Long id, String nome, String email, List<EventoResponseDto> eventos) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.eventos = eventos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<EventoResponseDto> getEventos() {
        return eventos;
    }

    public void setEventos(List<EventoResponseDto> eventos) {
        this.eventos = eventos;
    }
}
