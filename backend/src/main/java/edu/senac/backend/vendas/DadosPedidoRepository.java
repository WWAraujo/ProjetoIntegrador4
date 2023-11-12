package edu.senac.backend.vendas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DadosPedidoRepository extends JpaRepository<DadosPedidoModel, Long> {

    @Query("SELECT d FROM Pedidos d WHERE d.idCliente = :id")
    Optional<DadosPedidoModel[]> pesquisarPorId(@Param("id") Long id);


}
