package edu.senac.backend.produto;


public record ProdutoRecordConstructor(
        ProdutoRecord produto,
        AvaliacaoProdutoRecord avaliacaoProdutoRecord,
        FotosProdutoRecord fotosProdutoRecord
) {
}