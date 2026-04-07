package com.senac.condo_admin.controller;

import com.senac.condo_admin.model.entities.Unidade;
import com.senac.condo_admin.model.repository.UnidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unidades")
public class UnidadeController {

    @Autowired
    private UnidadeRepository unidadeRepository;

    @GetMapping
    public ResponseEntity<List<Unidade>> listarTodos() {
        var unidades = unidadeRepository.findAll();
        return ResponseEntity.ok(unidades);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Unidade> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(unidadeRepository.findById(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody Unidade unidade) {
        return ResponseEntity.ok(unidadeRepository.save(unidade).getId());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Unidade unidade) {
        var unidadeBanco = unidadeRepository.findById(id).orElse(null);

        if (unidadeBanco != null) {
            unidadeBanco.setBloco(unidade.getBloco());
            unidadeBanco.setNumero(unidade.getNumero());

            unidadeRepository.save(unidadeBanco);
            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.notFound().build();
    }
}