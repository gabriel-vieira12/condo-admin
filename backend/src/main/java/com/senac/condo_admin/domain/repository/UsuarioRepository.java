package com.senac.condo_admin.domain.repository;

import com.senac.condo_admin.domain.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario,Long> {

    Optional<Usuario> findByIdAndEmpresa_Id(Long id, Long empresaId);

    List<Usuario> getUsuariosByEmpresa_Id(Long empresa);

    boolean existsUsuarioByEmailContainingAndSenha(String email, String senha);
}