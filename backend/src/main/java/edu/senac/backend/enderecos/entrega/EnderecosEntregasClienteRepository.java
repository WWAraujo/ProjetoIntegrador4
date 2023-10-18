package edu.senac.backend.enderecos.entrega;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EnderecosEntregasClienteRepository extends JpaRepository<EnderecosEntregasClienteModel, Long> {

    @Query("SELECT e FROM Enderecos e WHERE e.idCliente = :id")
    List<EnderecosEntregasClienteModel> findIdByIdCliente(@Param("id") Long id);
}
