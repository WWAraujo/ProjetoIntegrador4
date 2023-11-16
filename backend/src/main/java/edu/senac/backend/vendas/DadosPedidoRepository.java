package edu.senac.backend.vendas;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface DadosPedidoRepository extends JpaRepository<DadosPedidoModel, Long> {

    @Query("SELECT d FROM Pedidos d WHERE d.idCliente = :id ORDER BY d.id DESC ")
    Optional<DadosPedidoModel[]> pesquisarPorId(@Param("id") Long id);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Pedidos p SET p.statusEntrega = :status WHERE p.id = :id")
    @Transactional
    int alterarStatus(@Param("id") Long id, @Param("status") String status);
}
