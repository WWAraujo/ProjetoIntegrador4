package edu.senac.backend.vendas;

import edu.senac.backend.produto.ProdutoRecord;
import edu.senac.backend.produto.ProdutoRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
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
    ){

        if (id > 0){
            List<PedidosRecord> response = new ArrayList<>();

            Optional<DadosPedidoModel[]> dadosPedidoModelList = dadosPedidoRepository.pesquisarPorId(id);

            if (dadosPedidoModelList.isPresent()){
                for (DadosPedidoModel dadosPedidoModel : dadosPedidoModelList.get()){

                    FormaPagamentoModel formaPagamentoModel = formaPagamentoRepository.pesquisarPorId(id);
                    List<ListaProdutosPedidoModel> listaProdutos = listaProdutosPedidoRepository.pesquisarPorId(id);

                    PedidosRecord pedidosRecord = new PedidosRecord(dadosPedidoModel,formaPagamentoModel,listaProdutos);

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
}
