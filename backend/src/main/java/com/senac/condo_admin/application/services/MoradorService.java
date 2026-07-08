package com.senac.condo_admin.application.services;

import com.senac.condo_admin.application.DTO.MoradorRequest;
import com.senac.condo_admin.application.DTO.MoradorResponse;
import com.senac.condo_admin.domain.entities.Morador;
import com.senac.condo_admin.domain.entities.Usuario;
import com.senac.condo_admin.domain.repository.MoradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoradorService {

    @Autowired
    private MoradorRepository moradorRepository;

    private Usuario getUsuarioLogado() {
        return (Usuario) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    public List<MoradorResponse> ListarTodos() {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return List.of();
        }

        return moradorRepository
                .findByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                .stream()
                .map(MoradorResponse::new)
                .toList();
    }

    public MoradorResponse BuscarPorId(Long id) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return null;
        }

        var morador = moradorRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        return morador != null ? new MoradorResponse(morador) : null;
    }

    public Long Salvar(MoradorRequest request) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return null;
        }

        Morador morador = new Morador();
        morador.setNome(request.nome());
        morador.setContato(request.contato());
        morador.setProprietario(request.proprietario());
        morador.setUnidadeId(request.unidadeId());
        morador.setEmpresa(usuarioLogado.getEmpresa());

        return moradorRepository.save(morador).getId();
    }

    public boolean Atualizar(Long id, MoradorRequest request) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return false;
        }

        var moradorBanco = moradorRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        if (moradorBanco == null) {
            return false;
        }

        moradorBanco.setNome(request.nome());
        moradorBanco.setContato(request.contato());
        moradorBanco.setProprietario(request.proprietario());
        moradorBanco.setUnidadeId(request.unidadeId());

        moradorRepository.save(moradorBanco);

        return true;
    }
}