package edu.senac.backend.produto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface AvaliacaoProdutoRepository extends JpaRepository<AvaliacaoProdutoModel, Integer>{

    @Transactional
    @Query("SELECT AVG(ap.avaliacao) AS avaliacao FROM AvaliacaoProduto ap WHERE ap.idProduto = :produtoId GROUP BY idProduto")
    Double calcularMediaAvaliacao(@Param("produtoId") Long produtoId);

}
