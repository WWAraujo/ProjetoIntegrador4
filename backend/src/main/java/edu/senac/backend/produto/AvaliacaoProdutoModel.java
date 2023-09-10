package edu.senac.backend.produto;


import jakarta.persistence.*;
import lombok.*;

@ToString
@Table(name = "avaliacao_produto")
@Entity(name = "AvaliacaoProduto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class AvaliacaoProdutoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idProduto;
    private Double avaliacao;

    public AvaliacaoProdutoModel(ProdutoModel produtoModel, AvaliacaoProdutoRecord avl) {
        this.idProduto = produtoModel.getId();
        this.avaliacao = avl.avaliacao();
    }

    public AvaliacaoProdutoModel(ProdutoModel produtoModel, AvaliacaoProdutoModel avl) {
        this.idProduto = produtoModel.getId();
        this.avaliacao = avl.getAvaliacao();
    }
}
