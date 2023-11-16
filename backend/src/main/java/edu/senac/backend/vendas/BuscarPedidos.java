package edu.senac.backend.vendas;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BuscarPedidos {

    public List<PedidosRecord> listarPedidos(
            Long id,
            DadosPedidoRepository dadosPedidoRepository,
            FormaPagamentoRepository formaPagamentoRepository,
            ListaProdutosPedidoRepository listaProdutosPedidoRepository
    ) {

        if (id > 0) {
            List<PedidosRecord> response = new ArrayList<>();

            Optional<DadosPedidoModel[]> dadosPedidoModelList = dadosPedidoRepository.pesquisarPorId(id);

            if (dadosPedidoModelList.isPresent()) {

                for (DadosPedidoModel dadosPedidoModel : dadosPedidoModelList.get()) {

                    FormaPagamentoModel formaPagamentoModel = formaPagamentoRepository.pesquisarPorId(dadosPedidoModel.getId());
                    List<ListaProdutosPedidoModel> listaProdutos = listaProdutosPedidoRepository.pesquisarPorId(dadosPedidoModel.getId());

                    PedidosRecord pedidosRecord = new PedidosRecord(dadosPedidoModel, formaPagamentoModel, listaProdutos);

                    response.add(pedidosRecord);
                }
                return response;

            } else {
                throw new RuntimeException("Não tem vendas salvas para esse cliente!");
            }
        } else {
            throw new RuntimeException("Falta informar o ID do cliente!");
        }
    }

    public List<PedidosRecord> listarPedidosTodosPedidos(
            Pageable pagina,
            DadosPedidoRepository dadosPedidoRepository,
            FormaPagamentoRepository formaPagamentoRepository,
            ListaProdutosPedidoRepository listaProdutosPedidoRepository
    ) {

        List<PedidosRecord> response = new ArrayList<>();

        Page<DadosPedidoModel> dadosPedidoModelList = dadosPedidoRepository.findAll(pagina);

        if (!dadosPedidoModelList.isEmpty()) {

            for (DadosPedidoModel dadosPedidoModel : dadosPedidoModelList) {

                FormaPagamentoModel formaPagamentoModel = formaPagamentoRepository.pesquisarPorId(dadosPedidoModel.getId());
                List<ListaProdutosPedidoModel> listaProdutos = listaProdutosPedidoRepository.pesquisarPorId(dadosPedidoModel.getId());

                PedidosRecord pedidosRecord = new PedidosRecord(dadosPedidoModel, formaPagamentoModel, listaProdutos);

                response.add(pedidosRecord);
            }
            return response;

        } else {
            throw new RuntimeException("Não tem vendas salvas para esse cliente!");
        }
    }
}
