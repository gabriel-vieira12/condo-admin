package com.senac.condo_admin.controller;

import com.senac.condo_admin.model.entities.Morador;
import com.senac.condo_admin.model.repository.MoradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/moradores")
public class MoradorController {

    @Autowired
    private MoradorRepository moradorRepository;

    @GetMapping
    public ResponseEntity<List<Morador>> listarTodos() {
        var moradores = moradorRepository.findAll();
        return ResponseEntity.ok(moradores);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Morador> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(moradorRepository.findById(id).orElse(null));
    }

    @PostMapping
    public ResponseEntity<Long> salvar(@RequestBody Morador morador) {
        return ResponseEntity.ok(moradorRepository.save(morador).getId());
    }

    @PutMapping("/{id}")
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