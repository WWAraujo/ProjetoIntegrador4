package edu.senac.backend.vendas;

public record ListaProdutosPedidoRecord(
        Long id,
        Long idPedido,
        Long idProduto,
        Long quantidade,
        Long valorUnidade
) {
}
