package com.senac.condo_admin.controller;

import com.senac.condo_admin.model.entities.Unidade;
import com.senac.condo_admin.model.repository.UnidadeRepository;
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
    private UnidadeRepository unidadeRepository;

    @GetMapping
    @Operation(summary = "Listar unidades", description = "Lista todas as unidades cadastradas no sistema")
    public ResponseEntity<List<Unidade>> listarTodos() {
        var unidades = unidadeRepository.findAll();
        return ResponseEntity.ok(unidades);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar unidade por ID", description = "Consulta uma unidade específica pelo seu identificador")
    public ResponseEntity<Unidade> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(unidadeRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(summary = "Criar unidade", description = "Cadastra uma nova unidade no sistema")
    public ResponseEntity<Long> salvar(@RequestBody Unidade unidade) {
        return ResponseEntity.ok(unidadeRepository.save(unidade).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar unidade", description = "Atualiza os dados de uma unidade existente")
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