package edu.senac.backend.produto;

import jakarta.persistence.*;
import lombok.*;

@ToString
@Table(name = "fotos_produto")
@Entity(name = "FotosProduto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class FotosProdutoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idProduto;
    private String nomeImg;
    private String caminhoImg;
    private String flagImg;

    public FotosProdutoModel(ProdutoModel produtoModel, FotosProdutoRecord fotos) {
        this.idProduto = produtoModel.getId();
        this.nomeImg = fotos.nomeImg();
        this.caminhoImg = fotos.caminhoImg();
        this.flagImg = fotos.flagImg();
    }
}
