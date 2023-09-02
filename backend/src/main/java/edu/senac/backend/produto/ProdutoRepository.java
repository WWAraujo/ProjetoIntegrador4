package edu.senac.backend.produto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<ProdutoModel, Integer> {

    @Query("SELECT p FROM Produto p WHERE p.nomeProduto LIKE %:pesquisa%")
    List<ProdutoModel> pesquisarPorNome(@Param("pesquisa") String pesquisa);
}
