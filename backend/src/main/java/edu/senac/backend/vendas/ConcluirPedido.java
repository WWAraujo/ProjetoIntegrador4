package edu.senac.backend.vendas;

import edu.senac.backend.produto.ProdutoModel;
import edu.senac.backend.produto.ProdutoRepository;
import java.util.Optional;

public class ConcluirPedido {

    public String ConcluirPedido(
            PedidosRecord venda,
            ProdutoRepository produtoRepository,
            DadosPedidoRepository dadosPedidoRepository,
            ListaProdutosPedidoRepository listaProdutosPedidoRepository) {

        String response = "Erro inesperado";

        boolean produtoPresente = venda.produtos().isEmpty();
        if (!produtoPresente){
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
        } else {
            response = "Produto(s) não encontrado(s) na O.S";
            return response;
        }

        DadosPedidoModel dadosPedidoModel = dadosPedidoRepository.save(venda.dadosVenda());

        for (ListaProdutosPedidoModel pdt : venda.produtos()){
            pdt.setIdPedido(dadosPedidoModel.getId());
            listaProdutosPedidoRepository.save(pdt);
        }

        response = "Produto cadastrado com sucesso!";
        return response;
    }
}
