package com.senac.condo_admin.model.entities;

import com.senac.condo_admin.model.enuns.EnumStatusUsuario;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    private String role;

    private String nomeCondominio;

    private EnumStatusUsuario status = EnumStatusUsuario.ATIVO;
}