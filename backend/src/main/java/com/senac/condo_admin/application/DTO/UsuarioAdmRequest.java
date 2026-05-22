package com.senac.condo_admin.application.DTO;

public record UsuarioAdmRequest(
    String nome,
    String email,
    String senha,
    String secretKey
) {
}
