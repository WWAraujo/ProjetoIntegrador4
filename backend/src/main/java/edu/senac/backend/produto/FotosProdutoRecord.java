package edu.senac.backend.produto;


public record FotosProdutoRecord(
        Integer idProduto,
        String nomeImg,
        String caminhoImg,
        String flagImg
) {
}
