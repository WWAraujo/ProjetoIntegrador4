package edu.senac.backend.vendas;

import edu.senac.backend.produto.ProdutoRepository;

public interface IConcluirPedido {
    String ConcluirPedido(
            PedidosRecord venda
//            ProdutoRepository produtoRepository,
//            DadosPedidoRepository dadosPedidoRepository,
//            ListaProdutosPedidoRepository listaProdutosPedidoRepository
    );

    void setProdutoRepository(ProdutoRepository produtoRepository);

    void setDadosPedidoRepository(DadosPedidoRepository dadosPedidoRepository);

    void setListaProdutosPedidoRepository(ListaProdutosPedidoRepository listaProdutosPedidoRepository);
}
