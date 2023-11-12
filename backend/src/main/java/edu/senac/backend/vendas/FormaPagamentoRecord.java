package edu.senac.backend.vendas;

public record FormaPagamentoRecord(
        Long id,
        Long idPedido,
        String formaPagamento,
        Double valorTotal,
        String nomeCartao,
        String numeroCartao,
        String ccvCartao,
        String validadeCartao,
        int quantidadeParcelas,
        Double valorDaParcela
) {
}
