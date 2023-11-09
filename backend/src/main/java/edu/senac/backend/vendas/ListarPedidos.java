package edu.senac.backend.vendas;

import java.util.ArrayList;
import java.util.List;

public class ListarPedidos {

    public List<PedidosRecord> listarPedido(
            Long cliente,
            DadosPedidoRepository dadosPedidoRepository,
            ListaProdutosPedidoRepository listaProdutosPedidoRepository,
            FormaPagamentoRepository formaPagamentoRepository){

        List<PedidosRecord> list = new ArrayList<>();

//        List<DadosPedidoModel> dadosPedidoModelList = dadosPedidoRepository.pesquisarPorId(cliente);


        return list;
    }
}
