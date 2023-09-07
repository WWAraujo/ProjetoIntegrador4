package edu.senac.backend.produto;


public record ProdutoRecord(

        Long id,
        String nomeProduto,
        String descricaoDetalhadaProduto,
        Double precoProduto,
        Integer qtdEstoque,
        String ativoInativo
){
}
