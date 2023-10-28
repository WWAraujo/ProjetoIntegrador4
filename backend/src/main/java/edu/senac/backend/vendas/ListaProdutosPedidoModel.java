package edu.senac.backend.vendas;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table(name = "lista_produtos_pedido")
@Entity(name = "ListaProdutosPedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ListaProdutosPedidoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idPedido;
    private Long idProduto;
    private Long quantidade;
    private Long valorUnidade;

    public ListaProdutosPedidoModel(ListaProdutosPedidoRecord produtos, Long id) {
        this.idPedido = id;
        this.idProduto = produtos.idProduto();
        this.quantidade = produtos.quantidade();
        this.valorUnidade = produtos.valorUnidade();
    }

}
