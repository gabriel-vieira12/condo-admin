package com.senac.condo_admin.domain.repository;

import com.senac.condo_admin.domain.entities.Morador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MoradorRepository extends JpaRepository<Morador, Long> {

    List<Morador> findByEmpresa_Id(Long empresaId);

    Optional<Morador> findByIdAndEmpresa_Id(Long id, Long empresaId);
}