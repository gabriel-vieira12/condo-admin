package com.senac.condo_admin.application.DTO;

import com.senac.condo_admin.domain.entities.Morador;

public record MoradorResponse(
        Long id,
        String nome,
        String contato,
        Boolean proprietario,
        Long unidadeId
) {
    public MoradorResponse(Morador morador) {
        this(
                morador.getId(),
                morador.getNome(),
                morador.getContato(),
                morador.getProprietario(),
                morador.getUnidadeId()
        );
    }
}