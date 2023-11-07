package edu.senac.backend.vendas;

import edu.senac.backend.produto.ProdutoModel;
import edu.senac.backend.produto.ProdutoRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConcluirPedidoImpl implements IConcluirPedido {

    @Autowired @Setter
    private ProdutoRepository produtoRepository;

    @Autowired @Setter
    private DadosPedidoRepository dadosPedidoRepository;

    @Autowired @Setter
    private ListaProdutosPedidoRepository listaProdutosPedidoRepository;

    @Autowired @Setter
    private FormaPagamentoRepository formaPagamentoRepository;


    @Override
    public String ConcluirPedido(PedidosRecord venda) {

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

            //SAlvar forma de pagamento
            venda.formaPagamento().setIdPedido(dadosPedidoModel.getId());
            formaPagamentoRepository.save(venda.formaPagamento());

            //Salvar toda lista de produtos no banco de dados
            for (ListaProdutosPedidoModel pdt : venda.produtos()){
                pdt.setIdPedido(dadosPedidoModel.getId());
                listaProdutosPedidoRepository.save(pdt);
            }

            response = "Produto cadastrado com sucesso! ID: "+dadosPedidoModel.getId();
            return response;
        } else {
            response = "Produto(s) não encontrado(s) na O.S";
            return response;
        }
    }
}
