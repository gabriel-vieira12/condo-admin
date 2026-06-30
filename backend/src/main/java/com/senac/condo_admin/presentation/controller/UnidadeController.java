package com.senac.condo_admin.presentation.controller;

import com.senac.condo_admin.application.DTO.UnidadeRequest;
import com.senac.condo_admin.application.DTO.UnidadeResponse;
import com.senac.condo_admin.domain.entities.Unidade;
import com.senac.condo_admin.domain.entities.Usuario;
import com.senac.condo_admin.domain.repository.UnidadeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unidades")
@Tag(name = "Unidades", description = "Controladora responsável pelo gerenciamento das unidades do condomínio")
public class UnidadeController {

    @Autowired
    private UnidadeRepository unidadeRepository;

    private Usuario getUsuarioLogado() {
        return (Usuario) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    @GetMapping
    @Operation(summary = "Listar unidades", description = "Lista todas as unidades cadastradas no condomínio do usuário logado")
    public ResponseEntity<List<UnidadeResponse>> listarTodos() {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.ok(List.of());
        }

        var unidades = unidadeRepository
                .findByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                .stream()
                .map(UnidadeResponse::new)
                .toList();

        return ResponseEntity.ok(unidades);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar unidade por ID", description = "Consulta uma unidade específica pelo seu identificador")
    public ResponseEntity<UnidadeResponse> buscarPorId(@PathVariable Long id) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.notFound().build();
        }

        var unidade = unidadeRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        return unidade != null
                ? ResponseEntity.ok(new UnidadeResponse(unidade))
                : ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Criar unidade", description = "Cadastra uma nova unidade no condomínio do usuário logado")
    public ResponseEntity<Long> salvar(@RequestBody UnidadeRequest request) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.badRequest().build();
        }

        Unidade unidade = new Unidade();
        unidade.setBloco(request.bloco());
        unidade.setNumero(request.numero());
        unidade.setEmpresa(usuarioLogado.getEmpresa());

        return ResponseEntity.ok(unidadeRepository.save(unidade).getId());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar unidade", description = "Atualiza os dados de uma unidade existente")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody UnidadeRequest request) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return ResponseEntity.badRequest().build();
        }

        var unidadeBanco = unidadeRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        if (unidadeBanco != null) {
            unidadeBanco.setBloco(request.bloco());
            unidadeBanco.setNumero(request.numero());

            unidadeRepository.save(unidadeBanco);

            return ResponseEntity.ok("Atualizado com sucesso!");
        }

        return ResponseEntity.notFound().build();
    }
}