export interface Produto {
  id: number;
  nomeProduto: string;
  descricaoDetalhadaProduto: string;
  precoProduto: number;
  qtdEstoque: number;
  ativoInativo: string;
}

export interface AvaliacaoProduto {
  idProduto: number;
  avaliacao: number;
}

export interface CarregarFotos {
  idProduto: number;
  nomeImg: string;
  caminhoImg: string;
  flagImg: string;
}
