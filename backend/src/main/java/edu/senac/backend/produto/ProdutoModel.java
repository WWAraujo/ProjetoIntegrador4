package edu.senac.backend.produto;

import edu.senac.backend.service.AtivoInativo;
import jakarta.persistence.*;
import lombok.*;
@ToString
@Table(name = "produto")
@Entity(name = "Produto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ProdutoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nomeProduto;
    private String descricaoDetalhadaProduto;
    private double precoProduto;
    private int qtdEstoque;
    private String ativoInativo;


}
