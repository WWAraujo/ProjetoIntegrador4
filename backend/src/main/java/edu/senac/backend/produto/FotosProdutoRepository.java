package edu.senac.backend.produto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FotosProdutoRepository extends JpaRepository<FotosProdutoModel, Integer> {

    @Query("SELECT fp FROM FotosProduto fp WHERE fp.idProduto = :produtoId")
    Optional<FotosProdutoModel[]> buscarFotosPorIdProduto(@Param("produtoId") Long produtoId);
}


