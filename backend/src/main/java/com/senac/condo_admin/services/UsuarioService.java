package com.senac.condo_admin.services;

import com.senac.condo_admin.model.DTO.LoginRequest;
import com.senac.condo_admin.model.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public boolean validaUsuarioSenha(LoginRequest loginRequest) {

        try{
            return usuarioRepository.existsUsuarioByEmailContainingSenha(loginRequest.email(), loginRequest.senha());
        }catch(Exception e){
            throw new RuntimeException(e);
        }

    }

    public Object ListarTodos() {
        try{
            return usuarioRepository.findAll();
        }catch(Exception e){
            throw new RuntimeException(e);
        }

    }
}
