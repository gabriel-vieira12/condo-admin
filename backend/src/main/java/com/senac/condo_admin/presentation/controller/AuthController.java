package com.senac.condo_admin.presentation.controller;

import com.senac.condo_admin.application.DTO.LoginRequest;
import com.senac.condo_admin.application.DTO.LoginResponse;
import com.senac.condo_admin.application.services.TokenService;
import com.senac.condo_admin.application.services.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@Tag(name = "Serviço autenticação", description = "Serviço responsavel por controlar a autenticação de usuarios e sessão!")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    @Operation(summary = "Realizar login", description = "Autentica um usuário no sistema com e-mail e senha")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        if (usuarioService.validaUsuarioSenha(loginRequest)) {

            var token = tokenService.gerarToken (loginRequest.email());

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}