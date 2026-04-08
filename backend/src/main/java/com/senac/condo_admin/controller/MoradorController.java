package com.senac.condo_admin.controller;

import com.senac.condo_admin.model.entities.Morador;
import com.senac.condo_admin.model.repository.MoradorRepository;
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
    private MoradorRepository moradorRepository;

    @GetMapping
    @Operation(summary = "Listar moradores", description = "Lista todos os moradores cadastrados no sistema")
    public ResponseEntity<List<Morador>> listarTodos() {
        var moradores = moradorRepository.findAll();
        return ResponseEntity.ok(moradores);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar morador por ID", description = "Consulta um morador específico pelo seu identificador")
    public ResponseEntity<Morador> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(moradorRepository.findById(id).orElse(null));
    }

    @PostMapping
    @Operation(summary = "Criar morador", description = "Cadastra um novo morador no sistema")
    public ResponseEntity<Long> salvar(@RequestBody Morador morador) {
        return ResponseEntity.ok(moradorRepository.save(morador).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar morador", description = "Atualiza os dados de um morador existente")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Morador morador) {
        var moradorBanco = moradorRepository.findById(id).orElse(null);

        if (moradorBanco != null) {
            moradorBanco.setNome(morador.getNome());
            moradorBanco.setContato(morador.getContato());
            moradorBanco.setProprietario(morador.getProprietario());
            moradorBanco.setUnidadeId(morador.getUnidadeId());

            moradorRepository.save(moradorBanco);
            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.notFound().build();
    }
}