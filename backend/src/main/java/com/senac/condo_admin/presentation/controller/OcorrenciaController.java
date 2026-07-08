package com.senac.condo_admin.presentation.controller;

import com.senac.condo_admin.application.DTO.OcorrenciaRequest;
import com.senac.condo_admin.application.DTO.OcorrenciaResponse;
import com.senac.condo_admin.application.services.OcorrenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ocorrencias")
@Tag(name = "Ocorrências", description = "Controladora responsável pelo gerenciamento das ocorrências")
public class OcorrenciaController {

    @Autowired
    private OcorrenciaService ocorrenciaService;

    @GetMapping
    @Operation(summary = "Listar ocorrências", description = "Lista as ocorrências do condomínio do usuário logado")
    public ResponseEntity<List<OcorrenciaResponse>> listarTodos() {
        return ResponseEntity.ok(ocorrenciaService.ListarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar ocorrência por ID", description = "Consulta uma ocorrência específica pelo seu identificador")
    public ResponseEntity<OcorrenciaResponse> buscarPorId(@PathVariable Long id) {
        var ocorrencia = ocorrenciaService.BuscarPorId(id);

        return ocorrencia != null
                ? ResponseEntity.ok(ocorrencia) : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Criar ocorrência", description = "Cadastra uma nova ocorrência no condomínio do usuário logado")
    public ResponseEntity<Long> salvar(@RequestBody OcorrenciaRequest request) {
        var id = ocorrenciaService.Salvar(request);

        return id != null
                ? ResponseEntity.ok(id) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar ocorrência", description = "Atualiza os dados de uma ocorrência existente")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody OcorrenciaRequest request) {
        var atualizado = ocorrenciaService.Atualizar(id, request);

        return atualizado
                ? ResponseEntity.ok("Atualizado com sucesso!") : ResponseEntity.notFound().build();
    }
}