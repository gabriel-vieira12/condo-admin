package com.senac.condo_admin.controller;


import com.senac.condo_admin.model.DTO.LoginRequest;
import com.senac.condo_admin.model.DTO.LoginResponse;
import com.senac.condo_admin.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){


        if(loginRequest.email().equals("String@s") &&  loginRequest.senha().equals("String")){
            return ResponseEntity.ok(new LoginResponse("Sasdasdas123"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }


}