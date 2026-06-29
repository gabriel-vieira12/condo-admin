package com.senac.condo_admin.presentation.controller;

import com.senac.condo_admin.application.DTO.MoradorResponse;
import com.senac.condo_admin.domain.entities.Morador;
import com.senac.condo_admin.domain.entities.Usuario;
import com.senac.condo_admin.domain.repository.MoradorRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/moradores")
@Tag(name = "Moradores", description = "Controladora responsável pelo gerenciamento dos moradores")
public class MoradorController {

    @Autowired
    private MoradorRepository moradorRepository;

    private Usuario getUsuarioLogado() {
        return (Usuario) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    @GetMapping
    @Operation(summary = "Listar moradores", description = "Lista os moradores do condomínio do usuário logado")
    public ResponseEntity<List<MoradorResponse>> listarTodos() {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.ok(List.of());
        }

        var moradores = moradorRepository
                .findByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                .stream()
                .map(MoradorResponse::new)
                .toList();

        return ResponseEntity.ok(moradores);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar morador por ID", description = "Consulta um morador específico pelo seu identificador")
    public ResponseEntity<MoradorResponse> buscarPorId(@PathVariable Long id) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.notFound().build();
        }

        var morador = moradorRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        return morador != null
                ? ResponseEntity.ok(new MoradorResponse(morador))
                : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Criar morador", description = "Cadastra um novo morador no condomínio do usuário logado")
    public ResponseEntity<Long> salvar(@RequestBody Morador morador) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.badRequest().build();
        }

        morador.setEmpresa(usuarioLogado.getEmpresa());

        return ResponseEntity.ok(moradorRepository.save(morador).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar morador", description = "Atualiza os dados de um morador existente")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody Morador morador) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.badRequest().build();
        }

        var moradorBanco = moradorRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

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