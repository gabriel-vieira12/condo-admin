package com.senac.condo_admin.presentation.controller;

import com.senac.condo_admin.application.DTO.UnidadeRequest;
import com.senac.condo_admin.application.DTO.UnidadeResponse;
import com.senac.condo_admin.application.services.UnidadeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unidades")
@Tag(name = "Unidades", description = "Controladora responsável pelo gerenciamento das unidades do condomínio")
public class UnidadeController {

    @Autowired
    private UnidadeService unidadeService;

    @GetMapping
    @Operation(summary = "Listar unidades", description = "Lista todas as unidades cadastradas no condomínio do usuário logado")
    public ResponseEntity<List<UnidadeResponse>> listarTodos() {
        return ResponseEntity.ok(unidadeService.ListarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar unidade por ID", description = "Consulta uma unidade específica pelo seu identificador")
    public ResponseEntity<UnidadeResponse> buscarPorId(@PathVariable Long id) {
        var unidade = unidadeService.BuscarPorId(id);

        return unidade != null
                ? ResponseEntity.ok(unidade) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Criar unidade", description = "Cadastra uma nova unidade no condomínio do usuário logado")
    public ResponseEntity<Long> salvar(@RequestBody UnidadeRequest request) {
        var id = unidadeService.Salvar(request);

        return id != null
                ? ResponseEntity.ok(id) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar unidade", description = "Atualiza os dados de uma unidade existente")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody UnidadeRequest request) {
        var atualizado = unidadeService.Atualizar(id, request);

        return atualizado
                ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }
}