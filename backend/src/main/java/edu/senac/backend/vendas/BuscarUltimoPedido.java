package edu.senac.backend.vendas;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BuscarUltimoPedido {

    public PedidosRecord ultimoPedido(
            Long id,
            DadosPedidoRepository dadosPedidoRepository,
            FormaPagamentoRepository formaPagamentoRepository,
            ListaProdutosPedidoRepository listaProdutosPedidoRepository
    ) {

        if (id > 0) {

            Optional<DadosPedidoModel> dadosPedidoModelList = dadosPedidoRepository.findById(id);

            if (dadosPedidoModelList.isPresent()) {

                DadosPedidoModel dadosPedidoModel = dadosPedidoModelList.get();
                FormaPagamentoModel formaPagamentoModel = formaPagamentoRepository.pesquisarPorId(dadosPedidoModel.getId());
                List<ListaProdutosPedidoModel> listaProdutos = listaProdutosPedidoRepository.pesquisarPorId(dadosPedidoModel.getId());

                PedidosRecord pedidosRecord = new PedidosRecord(dadosPedidoModel, formaPagamentoModel, listaProdutos);

                return pedidosRecord;
            } else {
                throw new RuntimeException("Não tem vendas salvas para esse cliente!");
            }

        } else {
            throw new RuntimeException("Falta informar o ID do cliente!");
        }
    }
}
