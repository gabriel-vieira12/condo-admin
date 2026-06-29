package com.senac.condo_admin.presentation.controller;

import com.senac.condo_admin.application.DTO.OcorrenciaResponse;
import com.senac.condo_admin.domain.entities.Ocorrencia;
import com.senac.condo_admin.domain.entities.Usuario;
import com.senac.condo_admin.domain.repository.OcorrenciaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ocorrencias")
@Tag(name = "Ocorrências", description = "Controladora responsável pelo gerenciamento das ocorrências")
public class OcorrenciaController {

    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;

    private Usuario getUsuarioLogado() {
        return (Usuario) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    @GetMapping
    @Operation(summary = "Listar ocorrências", description = "Lista as ocorrências do condomínio do usuário logado")
    public ResponseEntity<List<OcorrenciaResponse>> listarTodos() {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.ok(List.of());
        }

        var ocorrencias = ocorrenciaRepository
                .findByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                .stream()
                .map(OcorrenciaResponse::new)
                .toList();

        return ResponseEntity.ok(ocorrencias);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar ocorrência por ID", description = "Consulta uma ocorrência específica pelo seu identificador")
    public ResponseEntity<OcorrenciaResponse> buscarPorId(@PathVariable Long id) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.notFound().build();
        }

        var ocorrencia = ocorrenciaRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        return ocorrencia != null
                ? ResponseEntity.ok(new OcorrenciaResponse(ocorrencia))
                : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Criar ocorrência", description = "Cadastra uma nova ocorrência no condomínio do usuário logado")
    public ResponseEntity<Long> salvar(@RequestBody Ocorrencia ocorrencia) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.badRequest().build();
        }

        ocorrencia.setEmpresa(usuarioLogado.getEmpresa());

        return ResponseEntity.ok(ocorrenciaRepository.save(ocorrencia).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar ocorrência", description = "Atualiza os dados de uma ocorrência existente")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Ocorrencia ocorrencia) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.badRequest().build();
        }

        var ocorrenciaBanco = ocorrenciaRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

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