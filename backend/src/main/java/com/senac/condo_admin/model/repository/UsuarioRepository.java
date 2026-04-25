package com.senac.condo_admin.model.repository;

import com.senac.condo_admin.model.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    boolean existsUsuarioByEmailContainingSenha(String email, String senha);

}
