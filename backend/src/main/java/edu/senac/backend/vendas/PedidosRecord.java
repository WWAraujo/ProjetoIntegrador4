package edu.senac.backend.vendas;

import java.util.List;

public record PedidosRecord(

        DadosPedidoModel dadosVenda,
        FormaPagamentoModel formaPagamento,
        List<ListaProdutosPedidoModel> produtos
) {
}
