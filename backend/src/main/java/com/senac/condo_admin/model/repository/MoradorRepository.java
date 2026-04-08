package com.senac.condo_admin.model.repository;

import com.senac.condo_admin.model.entities.Morador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoradorRepository extends JpaRepository<Morador, Long> {
}