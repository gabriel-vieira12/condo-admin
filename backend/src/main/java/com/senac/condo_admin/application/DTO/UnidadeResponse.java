package com.senac.condo_admin.application.DTO;

import com.senac.condo_admin.domain.entities.Unidade;

public record UnidadeResponse(
        Long id,
        String bloco,
        String numero
) {
    public UnidadeResponse(Unidade unidade) {
        this(
                unidade.getId(),
                unidade.getBloco(),
                unidade.getNumero()
        );
    }
}