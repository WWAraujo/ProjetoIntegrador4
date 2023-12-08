package edu.senac.backend.vendas;

import java.util.LinkedList;

public record PedidosRecord(

        DadosPedidoModel dadosVenda,
        FormaPagamentoModel formaPagamento,
        LinkedList<ListaProdutosPedidoModel> produtos
) {
}
