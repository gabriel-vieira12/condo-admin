package com.senac.condo_admin.domain.repository;

import com.senac.condo_admin.domain.entities.Unidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UnidadeRepository extends JpaRepository<Unidade, Long> {

    List<Unidade> findByEmpresa_Id(Long empresaId);

    Optional<Unidade> findByIdAndEmpresa_Id(Long id, Long empresaId);
}