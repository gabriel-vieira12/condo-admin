package com.senac.condo_admin.domain.repository;

import com.senac.condo_admin.domain.entities.Ocorrencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Long> {

    List<Ocorrencia> findByEmpresa_Id(Long empresaId);

    Optional<Ocorrencia> findByIdAndEmpresa_Id(Long id, Long empresaId);
}