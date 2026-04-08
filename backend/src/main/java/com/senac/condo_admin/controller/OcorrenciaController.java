package com.senac.condo_admin.controller;

import com.senac.condo_admin.model.entities.Ocorrencia;
import com.senac.condo_admin.model.repository.OcorrenciaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ocorrencias")
@Tag(name = "Ocorrências", description = "Controladora responsável pelo gerenciamento das ocorrências do condomínio")
public class OcorrenciaController {

    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;

    @GetMapping
    @Operation(summary = "Listar ocorrências", description = "Lista todas as ocorrências cadastradas no sistema")
    public ResponseEntity<List<Ocorrencia>> listarTodos() {
        var ocorrencias = ocorrenciaRepository.findAll();
        return ResponseEntity.ok(ocorrencias);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar ocorrência por ID", description = "Consulta uma ocorrência específica pelo seu identificador")
    public ResponseEntity<Ocorrencia> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ocorrenciaRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(summary = "Criar ocorrência", description = "Cadastra uma nova ocorrência no sistema")
    public ResponseEntity<Long> salvar(@RequestBody Ocorrencia ocorrencia) {
        return ResponseEntity.ok(ocorrenciaRepository.save(ocorrencia).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar ocorrência", description = "Atualiza os dados de uma ocorrência existente")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Ocorrencia ocorrencia) {
        var ocorrenciaBanco = ocorrenciaRepository.findById(id).orElse(null);

        if (ocorrenciaBanco != null) {
            ocorrenciaBanco.setDescricao(ocorrencia.getDescricao());
            ocorrenciaBanco.setGravidade(ocorrencia.getGravidade());
            ocorrenciaBanco.setStatus(ocorrencia.getStatus());
            ocorrenciaBanco.setUnidadeId(ocorrencia.getUnidadeId());

            ocorrenciaRepository.save(ocorrenciaBanco);
            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.notFound().build();
    }
}