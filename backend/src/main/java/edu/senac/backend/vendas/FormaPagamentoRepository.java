package edu.senac.backend.vendas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FormaPagamentoRepository extends JpaRepository<FormaPagamentoModel, Long> {

    @Query("SELECT p FROM FormaPagamento p WHERE p.idPedido = :id")
    FormaPagamentoModel pesquisarPorId(@Param("id") Long id);
}
