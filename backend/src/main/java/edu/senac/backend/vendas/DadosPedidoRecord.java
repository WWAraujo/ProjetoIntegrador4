package edu.senac.backend.vendas;

import java.util.List;

public record DadosPedidoRecord(
        Long id,
        Long idCliente,
        String nomeCliente,
        String dataCompra,
        String prazoEntrega,
        Double valorEntrega,
        Double valorTotal,
        String statusEntrega,
        String formaPagamento,
        int qtdParcelas,
        String cep,
        String logradouro,
        String numero,
        String complemento,
        String bairro,
        String cidade,
        String uf
) {
}
