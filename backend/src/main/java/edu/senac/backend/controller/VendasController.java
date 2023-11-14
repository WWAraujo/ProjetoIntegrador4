package edu.senac.backend.controller;

import edu.senac.backend.produto.ProdutoRepository;
import edu.senac.backend.vendas.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/vendas")
public class VendasController{

    @Autowired
    private ConcluirPedido concluirPedido;

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    private DadosPedidoRepository dadosPedidoRepository;

    @Autowired
    private ListaProdutosPedidoRepository listaProdutosPedidoRepository;

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    @PostMapping("/cadastrar")
    public Long salvarVenda(@RequestBody PedidosRecord venda) {
        return
                new ConcluirPedido()
                        .ConcluirPedido(
                                venda,
                                produtoRepository,
                                dadosPedidoRepository,
                                listaProdutosPedidoRepository,
                                formaPagamentoRepository
                );
    }

    @GetMapping("/ultima/{cliente}")
    public ResponseEntity<PedidosRecord> getVenda(@PathVariable Long cliente) {
        return ResponseEntity.ok().body(
                new BuscarUltimoPedido().ultimoPedido(
                        cliente,
                        dadosPedidoRepository,
                        formaPagamentoRepository,
                        listaProdutosPedidoRepository
                )
        );
    }
    @GetMapping("/{cliente}")
    public ResponseEntity<List<PedidosRecord>> getVendas(@PathVariable Long cliente) {
        return ResponseEntity.ok().body(
                new BuscarPedidos().listarPedidos(
                        cliente,
                        dadosPedidoRepository,
                        formaPagamentoRepository,
                        listaProdutosPedidoRepository
                )
        );
    }
}
