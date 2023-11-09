package edu.senac.backend.vendas;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DadosPedidoRepository extends JpaRepository<DadosPedidoModel, Long> {

//    @Query("SELECT d FROM DadosPedidoModel d WHERE d.idCliente = :id")
//    List<DadosPedidoModel> pesquisarPorId(@Param("id") Long id);

}
