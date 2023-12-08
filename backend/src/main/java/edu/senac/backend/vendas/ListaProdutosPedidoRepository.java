package edu.senac.backend.vendas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.LinkedList;

public interface ListaProdutosPedidoRepository extends JpaRepository<ListaProdutosPedidoModel, Long> {

    @Query("SELECT d FROM ListaProdutosPedido d WHERE d.idPedido = :id")
    LinkedList<ListaProdutosPedidoModel> pesquisarPorId(@Param("id") Long id);
}
