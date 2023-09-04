package edu.senac.backend.produto;


public record ProdutoRecord(

        Integer id,
        String nomeProduto,
        String descricaoDetalhadaProduto,
        Double precoProduto,
        Integer qtdEstoque,
        String ativoInativo
){
}
