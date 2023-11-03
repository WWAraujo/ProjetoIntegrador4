package edu.senac.backend.vendas;

import edu.senac.backend.produto.ProdutoModel;
import edu.senac.backend.produto.ProdutoRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ConcluirPedido {

    public String ConcluirPedido(
            PedidosRecord venda,
            ProdutoRepository produtoRepository,
            DadosPedidoRepository dadosPedidoRepository,
            ListaProdutosPedidoRepository listaProdutosPedidoRepository,
            FormaPagamentoRepository formaPagamentoRepository) {

        String response;

        boolean produtoPresente = venda.produtos().isEmpty();
        if (!produtoPresente){

            //Verificar se tem produtos suficiente no estoque
            for (ListaProdutosPedidoModel lista : venda.produtos()) {
                Integer id = Integer.parseInt(lista.getIdProduto().toString());
                Optional<ProdutoModel> buscarproduto = produtoRepository.findById(id);
                if (buscarproduto.isPresent()) {
                    if (lista.getQuantidade() > buscarproduto.get().getQtdEstoque()) {
                        Long qtdFaltante = lista.getQuantidade() - buscarproduto.get().getQtdEstoque();
                        response = "O Produto " + buscarproduto.get().getNomeProduto() + " com ID: "
                                + buscarproduto.get().getId() + " não tem estoque suficiente. Falta " + qtdFaltante + " unidades.";
                        return response;
                    }
                } else {
                    response = "Produto não encontrado id: "+lista.getIdProduto();
                    return response;
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
            for (ListaProdutosPedidoModel pdt : venda.produtos()){
                pdt.setIdPedido(idVenda);
                listaProdutosPedidoModels.add(listaProdutosPedidoRepository.save(pdt));
            }

            if (idVenda > 0 &&
                    !listaProdutosPedidoModels.isEmpty() &&
                    formaPagamentoModel.getId() > 0){
                response = "Produto cadastrado com sucesso! ID: " + idVenda;
                return response;
            }

            //Retorne essa mensagem caso a persistencia no banco de algum erro.
            String idProdutosCadastrados = new String();
            for (ListaProdutosPedidoModel pdt : listaProdutosPedidoModels){
                idProdutosCadastrados = idProdutosCadastrados + pdt.getId().toString() + ", ";
            }
            response = "Algo deu erro na persistencia do banco de dados:" +
                    "ID venda : " + idVenda +
                    "ID forma de pagamento: "+ formaPagamentoModel.getId() +" " +
                    "ID dos produtos: " + idProdutosCadastrados;
            return response;

        } else {
            response = "Produto(s) não encontrado(s) na O.S";
            return response;
        }
    }
}
