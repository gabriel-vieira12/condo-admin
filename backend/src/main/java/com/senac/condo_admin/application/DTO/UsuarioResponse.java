package com.senac.condo_admin.application.DTO;

import com.senac.condo_admin.domain.entities.Usuario;

public record UsuarioResponse(

        Long id,
        String nome,
        String email,
        String status
) {
    public UsuarioResponse(Usuario usuario){
        this(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getStatus().toString()
        );
    }
}
