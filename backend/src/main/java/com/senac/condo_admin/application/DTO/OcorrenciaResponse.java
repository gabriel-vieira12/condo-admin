package com.senac.condo_admin.application.DTO;

import com.senac.condo_admin.domain.entities.Ocorrencia;

public record OcorrenciaResponse(
        Long id,
        String descricao,
        String gravidade,
        String status,
        Long unidadeId
) {
    public OcorrenciaResponse(Ocorrencia ocorrencia) {
        this(
                ocorrencia.getId(),
                ocorrencia.getDescricao(),
                ocorrencia.getGravidade(),
                ocorrencia.getStatus(),
                ocorrencia.getUnidadeId()
        );
    }
}