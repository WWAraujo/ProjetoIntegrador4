package edu.senac.backend.vendas;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ListarPedidos {

    public LinkedList<PedidosRecord> listarPedido(
            Long cliente,
            DadosPedidoRepository dadosPedidoRepository,
            ListaProdutosPedidoRepository listaProdutosPedidoRepository,
            FormaPagamentoRepository formaPagamentoRepository){

        LinkedList<PedidosRecord> list = new LinkedList<>();

//        LinkedList<DadosPedidoModel> dadosPedidoModelList = dadosPedidoRepository.pesquisarPorId(cliente);


        return list;
    }
}
