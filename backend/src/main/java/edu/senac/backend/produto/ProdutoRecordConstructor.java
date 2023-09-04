package edu.senac.backend.produto;


import java.util.List;

public record ProdutoRecordConstructor(
        ProdutoRecord produto,
        AvaliacaoProdutoRecord avaliacaoProdutoRecord,
        List<FotosProdutoRecord> fotosProdutoRecord
) {
}