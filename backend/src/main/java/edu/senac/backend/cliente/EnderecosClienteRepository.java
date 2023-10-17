package edu.senac.backend.cliente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnderecosClienteRepository extends JpaRepository<EnderecosClienteModel, Long> {

    @Query("SELECT e FROM Enderecos e WHERE e.idCliente = :id")
    List<EnderecosClienteModel> findIdByIdCliente(@Param("id") Long id);
}
