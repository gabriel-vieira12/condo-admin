package com.senac.condo_admin.domain.entities;

import com.senac.condo_admin.domain.valueobjects.CNPJ;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String RazaoSocial;

    private String NomeFantasia;

    @Embedded
    private CNPJ cnpj;

    @OneToMany(mappedBy = "empresa")
    private List<Usuario> usuarios;

}