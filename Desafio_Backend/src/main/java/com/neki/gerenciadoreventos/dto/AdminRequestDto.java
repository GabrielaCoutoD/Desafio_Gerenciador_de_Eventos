package com.neki.gerenciadoreventos.dto;

import java.util.List;

public class AdminRequestDto {

    private String nome;
    private String email;
    private String senha;
    private List<EventoRequestDto> eventos;

   

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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public List<EventoRequestDto> getEventos() {
        return eventos;
    }

    public void setEventos(List<EventoRequestDto> eventos) {
        this.eventos = eventos;
    }
}
