package edu.senac.backend.vendas;

import edu.senac.backend.produto.ProdutoModel;
import edu.senac.backend.produto.ProdutoRepository;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class ConcluirPedido {

    public Long ConcluirPedido(
            PedidosRecord venda,
            ProdutoRepository produtoRepository,
            DadosPedidoRepository dadosPedidoRepository,
            ListaProdutosPedidoRepository listaProdutosPedidoRepository,
            FormaPagamentoRepository formaPagamentoRepository) {

        String response;

        //Verificar se tem produtos suficiente no estoque
        for (ListaProdutosPedidoModel lista : venda.produtos()) {
            Integer id = Integer.parseInt(lista.getIdProduto().toString());
            Optional<ProdutoModel> buscarproduto = produtoRepository.findById(id);
            if (buscarproduto.isPresent()) {
                if (lista.getQuantidade() > buscarproduto.get().getQtdEstoque()) {
                    Long qtdFaltante = lista.getQuantidade() - buscarproduto.get().getQtdEstoque();

                    throw new RuntimeException("O Produto " + buscarproduto.get().getNomeProduto() + " com ID: "
                            + buscarproduto.get().getId() + " não tem estoque suficiente. Falta " + qtdFaltante + " unidades.");

                }
            } else {
                throw new RuntimeException("Produto não encontrado id: " + lista.getIdProduto());
            }
        }

        //Salvar os dados da venda no banco
        DadosPedidoModel dadosPedidoModel = dadosPedidoRepository.save(venda.dadosVenda());
        Long idVenda = dadosPedidoModel.getId();

        //Salvar a forma de pagamento
        venda.formaPagamento().setIdPedido(idVenda);
        FormaPagamentoModel formaPagamentoModel = formaPagamentoRepository.save(venda.formaPagamento());


        //Salvar toda lista de produtos no banco de dados
        List<ListaProdutosPedidoModel> listaProdutosPedidoModels = new ArrayList<>();
        for (ListaProdutosPedidoModel pdt : venda.produtos()) {
            pdt.setIdPedido(idVenda);
            listaProdutosPedidoModels.add(listaProdutosPedidoRepository.save(pdt));
        }

        if (idVenda > 0 &&
                !listaProdutosPedidoModels.isEmpty() &&
                formaPagamentoModel.getId() > 0) {
            return idVenda;
        }

        //Retorne essa mensagem caso a persistência de erro.
        String idProdutosCadastrados = new String();
        for (ListaProdutosPedidoModel pdt : listaProdutosPedidoModels) {
            idProdutosCadastrados = idProdutosCadastrados + pdt.getId().toString() + ", ";
        }

        throw new RuntimeException("Algo deu erro na persistencia do banco de dados:" +
                "ID venda : " + idVenda +
                "ID forma de pagamento: " + formaPagamentoModel.getId() + " " +
                "ID dos produtos: " + idProdutosCadastrados);
    }

    public String AlterarPedido(
            PedidosRecord venda,
            DadosPedidoRepository dadosPedidoRepository) {

        String response="Não foi possivel fazer a alteração no banco!";

        //Alterar os dados de status entrega
        int resposta = dadosPedidoRepository.alterarStatus(venda.dadosVenda().getId(), venda.dadosVenda().getStatusEntrega());

        if (resposta == 1){
            return response="Status Alterado com sucesso!";
        }
        return response;
    }
}
