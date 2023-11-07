package edu.senac.backend.vendas;

import edu.senac.backend.produto.ProdutoRepository;

public interface IConcluirPedido {
    String ConcluirPedido(PedidosRecord venda);

    void setProdutoRepository(ProdutoRepository produtoRepository);

    void setDadosPedidoRepository(DadosPedidoRepository dadosPedidoRepository);

    void setListaProdutosPedidoRepository(ListaProdutosPedidoRepository listaProdutosPedidoRepository);
}
