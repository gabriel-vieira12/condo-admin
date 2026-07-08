package com.senac.condo_admin.presentation.controller;

import com.senac.condo_admin.application.DTO.MoradorRequest;
import com.senac.condo_admin.application.DTO.MoradorResponse;
import com.senac.condo_admin.application.services.MoradorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/moradores")
@Tag(name = "Moradores", description = "Controladora responsável pelo gerenciamento dos moradores")
public class MoradorController {

    @Autowired
    private MoradorService moradorService;

    @GetMapping
    @Operation(summary = "Listar moradores", description = "Lista os moradores do condomínio do usuário logado")
    public ResponseEntity<List<MoradorResponse>> listarTodos() {
        return ResponseEntity.ok(moradorService.ListarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar morador por ID", description = "Consulta um morador específico pelo seu identificador")
    public ResponseEntity<MoradorResponse> buscarPorId(@PathVariable Long id) {
        var morador = moradorService.BuscarPorId(id);

        return morador != null ? ResponseEntity.ok(morador) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Criar morador", description = "Cadastra um novo morador no condomínio do usuário logado")
    public ResponseEntity<Long> salvar(@RequestBody MoradorRequest request) {
        var id = moradorService.Salvar(request);

        return id != null ? ResponseEntity.ok(id) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar morador", description = "Atualiza os dados de um morador existente")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody MoradorRequest request) {
        var atualizado = moradorService.Atualizar(id, request);

        return atualizado ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }
}