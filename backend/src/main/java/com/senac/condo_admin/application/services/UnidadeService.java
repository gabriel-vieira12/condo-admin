package com.senac.condo_admin.application.services;

import com.senac.condo_admin.application.DTO.UnidadeRequest;
import com.senac.condo_admin.application.DTO.UnidadeResponse;
import com.senac.condo_admin.domain.entities.Unidade;
import com.senac.condo_admin.domain.entities.Usuario;
import com.senac.condo_admin.domain.repository.UnidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnidadeService {

    @Autowired
    private UnidadeRepository unidadeRepository;

    private Usuario getUsuarioLogado() {
        return (Usuario) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    public List<UnidadeResponse> ListarTodos() {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return List.of();
        }

        return unidadeRepository
                .findByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                .stream()
                .map(UnidadeResponse::new)
                .toList();
    }

    public UnidadeResponse BuscarPorId(Long id) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return null;
        }

        var unidade = unidadeRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        return unidade != null ? new UnidadeResponse(unidade) : null;
    }

    public Long Salvar(UnidadeRequest request) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return null;
        }

        Unidade unidade = new Unidade();
        unidade.setBloco(request.bloco());
        unidade.setNumero(request.numero());
        unidade.setEmpresa(usuarioLogado.getEmpresa());

        return unidadeRepository.save(unidade).getId();
    }

    public boolean Atualizar(Long id, UnidadeRequest request) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return false;
        }

        var unidadeBanco = unidadeRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        if (unidadeBanco == null) {
            return false;
        }

        unidadeBanco.setBloco(request.bloco());
        unidadeBanco.setNumero(request.numero());

        unidadeRepository.save(unidadeBanco);

        return true;
    }
}