package com.senac.condo_admin.application.DTO;

public record MoradorRequest(
        String nome,
        String contato,
        Boolean proprietario,
        Long unidadeId
) {
}