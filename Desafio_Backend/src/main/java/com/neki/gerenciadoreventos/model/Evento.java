package com.neki.gerenciadoreventos.model;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
public class Evento {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String nome;
	private LocalDate data;
	private String localizacao;
	private String imagem;

	@ManyToOne
	@JoinColumn(name = "admin_id", nullable = false)
	private Administrador administrador;

	public Evento() {
	}

	public Evento(String nome, LocalDate data, String localizacao, String imagem, Administrador administrador) {
		this.nome = nome;
		this.data = data;
		this.localizacao = localizacao;
		this.imagem = imagem;
		this.administrador = administrador;
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

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}

	public String getLocalizacao() {
		return localizacao;
	}

	public void setLocalizacao(String localizacao) {
		this.localizacao = localizacao;
	}

	public String getImagem() {
		return imagem;
	}

	public void setImagem(String imagem) {
		this.imagem = imagem;
	}

	public Administrador getAdministrador() {
		return administrador;
	}

	public void setAdministrador(Administrador administrador) {
		this.administrador = administrador;
	}
}
