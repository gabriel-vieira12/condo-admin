package com.senac.condo_admin.controller;

import com.senac.condo_admin.model.entities.Ocorrencia;
import com.senac.condo_admin.model.repository.OcorrenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ocorrencias")
public class OcorrenciaController {

    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;

    @GetMapping
    public ResponseEntity<List<Ocorrencia>> listarTodos() {
        var ocorrencias = ocorrenciaRepository.findAll();
        return ResponseEntity.ok(ocorrencias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ocorrencia> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(ocorrenciaRepository.findById(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody Ocorrencia ocorrencia) {
        return ResponseEntity.ok(ocorrenciaRepository.save(ocorrencia).getId());
    }

    @PutMapping("/{id}")
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