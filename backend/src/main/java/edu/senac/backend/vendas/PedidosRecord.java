package edu.senac.backend.vendas;

import java.util.List;

public record PedidosRecord(

        DadosPedidoModel dadosVenda,
        List<ListaProdutosPedidoModel> produtos
) {
}
