package edu.senac.backend.produto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<ProdutoModel, Integer> {

    @Query("SELECT p FROM Produto p WHERE p.nomeProduto LIKE %:pesquisa%")
    List<ProdutoModel> pesquisarPorNome(@Param("pesquisa") String pesquisa);

    @Modifying
    @Transactional
    @Query("UPDATE Produto p SET p.ativoInativo = :status WHERE p.id = :id")
    void updateStatusToAtivoInativo(@Param("status") String status, @Param("id") Long id);
}
