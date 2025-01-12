package com.neki.gerenciadoreventos.service;

import org.springframework.stereotype.Service;

import com.neki.gerenciadoreventos.dto.EventoRequestDto;
import com.neki.gerenciadoreventos.dto.EventoUpdateDto;
import com.neki.gerenciadoreventos.model.Administrador;
import com.neki.gerenciadoreventos.model.Evento;
import com.neki.gerenciadoreventos.repository.AdminRepository;
import com.neki.gerenciadoreventos.repository.EventoRepository;

import java.util.List;

@Service
public class EventoService {

	private final EventoRepository eventoRepository;
	private final AdminRepository adminRepository;

	public EventoService(EventoRepository eventoRepository, AdminRepository adminRepository) {
		this.eventoRepository = eventoRepository;
		this.adminRepository = adminRepository;
	}

	public Evento cadastrarEvento(EventoRequestDto eventoRequestDto) {
		Administrador administrador = adminRepository.findById(eventoRequestDto.getAdminId())
				.orElseThrow(() -> new RuntimeException("Administrador não encontrado"));

		Evento evento = new Evento(eventoRequestDto.getNome(), eventoRequestDto.getData(),
				eventoRequestDto.getLocalizacao(), eventoRequestDto.getImagem(), administrador);

		return eventoRepository.save(evento);
	}

	public List<Evento> getEventosByAdminId(Long adminId) {
		return eventoRepository.findByAdministradorId(adminId);
	}

	public Evento atualizarEvento(Long eventoId, EventoUpdateDto eventoUpdateDto) {
		Evento evento = eventoRepository.findById(eventoId)
				.orElseThrow(() -> new RuntimeException("Evento não encontrado"));

		evento.setData(eventoUpdateDto.getData());
		evento.setLocalizacao(eventoUpdateDto.getLocalizacao());

		return eventoRepository.save(evento);
	}

	public void deleteEvento(Long eventoId) {
		Evento evento = eventoRepository.findById(eventoId)
				.orElseThrow(() -> new RuntimeException("Evento não encontrado"));

		eventoRepository.delete(evento);
	}
}
