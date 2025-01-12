package com.neki.gerenciadoreventos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.neki.gerenciadoreventos.dto.EventoRequestDto;
import com.neki.gerenciadoreventos.dto.EventoUpdateDto;
import com.neki.gerenciadoreventos.model.Evento;
import com.neki.gerenciadoreventos.service.EventoService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8088")
@RestController
@RequestMapping("/evento")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @PostMapping
    public ResponseEntity<Evento> cadastrarEvento(@RequestBody EventoRequestDto eventoRequestDto) {
        return ResponseEntity.ok(eventoService.cadastrarEvento(eventoRequestDto));
    }

    @GetMapping("/{adminId}")
    public ResponseEntity<List<Evento>> getEventosByAdminId(@PathVariable Long adminId) {
        return ResponseEntity.ok(eventoService.getEventosByAdminId(adminId));
    }

    @PutMapping("/{eventoId}")
    public ResponseEntity<?> atualizarEvento(@PathVariable Long eventoId, @RequestBody EventoUpdateDto eventoUpdateDto) {
        return ResponseEntity.ok(eventoService.atualizarEvento(eventoId, eventoUpdateDto));
    }

    @DeleteMapping("/{eventoId}")
    public ResponseEntity<?> deleteEvento(@PathVariable Long eventoId) {
        eventoService.deleteEvento(eventoId);
        return ResponseEntity.ok("Evento excluído com sucesso");
    }
}
