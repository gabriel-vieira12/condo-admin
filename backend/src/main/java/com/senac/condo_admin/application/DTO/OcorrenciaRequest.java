package com.senac.condo_admin.application.DTO;

public record OcorrenciaRequest(
        String descricao,
        String gravidade,
        String status,
        Long unidadeId
) {
}