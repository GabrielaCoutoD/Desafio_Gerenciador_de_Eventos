package com.neki.gerenciadoreventos.dto;

import java.time.LocalDate;

public class EventoUpdateDto {

	private LocalDate data;
	private String localizacao;

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

}
