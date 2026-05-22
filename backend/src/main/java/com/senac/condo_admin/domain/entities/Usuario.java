package com.senac.condo_admin.domain.entities;


import com.senac.condo_admin.application.DTO.UsuarioAdmRequest;
import com.senac.condo_admin.application.DTO.UsuarioRequest;
import com.senac.condo_admin.domain.enuns.EnumStatusUsuario;
import jakarta.persistence.*;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    private String role;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;

    public Usuario(UsuarioRequest usuario) {
        this.email =usuario.email();
        this.nome = usuario.nome();
        this.senha = usuario.senha();
        this.role = "ROLE_USER";
    }

    public Usuario(UsuarioAdmRequest usuario) {
        this.email =usuario.email();
        this.nome = usuario.nome();
        this.senha = usuario.senha();
        this.role = "ROLE_ADMIN";
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role));
    }

    @Override
    public @Nullable String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return  this.email;
    }
}