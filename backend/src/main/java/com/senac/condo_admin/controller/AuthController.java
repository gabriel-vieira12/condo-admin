package com.senac.condo_admin.controller;

import com.senac.condo_admin.model.DTO.LoginRequest;
import com.senac.condo_admin.model.DTO.LoginResponse;
import com.senac.condo_admin.model.repository.UsuarioRepository;
import com.senac.condo_admin.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticação", description = "Controladora responsável pelo processo de autenticação do sistema")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    @Operation(summary = "Realizar login", description = "Autentica um usuário no sistema com e-mail e senha")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        if (loginRequest.email().equals("String@s") && loginRequest.senha().equals("String")) {

            var token = tokenService.gerarToken (loginRequest.email());

            return ResponseEntity.ok(new LoginResponse(token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}