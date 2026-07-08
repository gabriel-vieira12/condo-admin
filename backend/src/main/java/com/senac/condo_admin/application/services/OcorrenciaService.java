package com.senac.condo_admin.application.services;

import com.senac.condo_admin.application.DTO.OcorrenciaRequest;
import com.senac.condo_admin.application.DTO.OcorrenciaResponse;
import com.senac.condo_admin.domain.entities.Ocorrencia;
import com.senac.condo_admin.domain.entities.Usuario;
import com.senac.condo_admin.domain.repository.OcorrenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OcorrenciaService {

    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;

    @Autowired
    private EmailService emailService;

    private Usuario getUsuarioLogado() {
        return (Usuario) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
    }

    public List<OcorrenciaResponse> ListarTodos() {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return List.of();
        }

        return ocorrenciaRepository
                .findByEmpresa_Id(usuarioLogado.getEmpresa().getId())
                .stream()
                .map(OcorrenciaResponse::new)
                .toList();
    }

    public OcorrenciaResponse BuscarPorId(Long id) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return null;
        }

        var ocorrencia = ocorrenciaRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        return ocorrencia != null ? new OcorrenciaResponse(ocorrencia) : null;
    }

    public Long Salvar(OcorrenciaRequest request) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return null;
        }

        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setDescricao(request.descricao());
        ocorrencia.setGravidade(request.gravidade());
        ocorrencia.setStatus(request.status());
        ocorrencia.setUnidadeId(request.unidadeId());
        ocorrencia.setEmpresa(usuarioLogado.getEmpresa());

        Ocorrencia ocorrenciaSalva = ocorrenciaRepository.save(ocorrencia);

        if ("GRAVE".equalsIgnoreCase(ocorrenciaSalva.getGravidade())) {
            try {
                emailService.enviarEmailOcorrenciaGrave(
                        usuarioLogado.getEmail(),
                        usuarioLogado.getNome(),
                        ocorrenciaSalva.getDescricao(),
                        "ID da unidade: " + ocorrenciaSalva.getUnidadeId()
                );
            } catch (Exception e) {
                System.out.println("Erro ao enviar e-mail de ocorrência grave: " + e.getMessage());
            }
        }

        return ocorrenciaSalva.getId();
    }

    public boolean Atualizar(Long id, OcorrenciaRequest request) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuarioLogado.getEmpresa() == null) {
            return false;
        }

        var ocorrenciaBanco = ocorrenciaRepository
                .findByIdAndEmpresa_Id(id, usuarioLogado.getEmpresa().getId())
                .orElse(null);

        if (ocorrenciaBanco == null) {
            return false;
        }

        ocorrenciaBanco.setDescricao(request.descricao());
        ocorrenciaBanco.setGravidade(request.gravidade());
        ocorrenciaBanco.setStatus(request.status());
        ocorrenciaBanco.setUnidadeId(request.unidadeId());

        ocorrenciaRepository.save(ocorrenciaBanco);

        return true;
    }
}