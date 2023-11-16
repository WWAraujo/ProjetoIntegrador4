package edu.senac.backend.controller;

import edu.senac.backend.produto.ProdutoRepository;
import edu.senac.backend.vendas.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/vendas")
public class VendasController {

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

    @PostMapping("/alterar-entrega")
    public String alterarEntrega(@RequestBody PedidosRecord venda) {
        return new ConcluirPedido().AlterarPedido(venda, dadosPedidoRepository);
    }

    @GetMapping("/ultima/{cliente}")
    public ResponseEntity<PedidosRecord> getUltimaVenda(@PathVariable Long cliente) {
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
    public ResponseEntity<List<PedidosRecord>> getVendasPorCliente(
            @PathVariable Long cliente,
            @PageableDefault(size = 50, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pagina) {
        return ResponseEntity.ok().body(
                new BuscarPedidos().listarPedidos(
                        cliente,
                        dadosPedidoRepository,
                        formaPagamentoRepository,
                        listaProdutosPedidoRepository
                )
        );
    }

    @GetMapping("/todas-vendas")
    public ResponseEntity<List<PedidosRecord>> getVendasTotal(
            @PageableDefault(size = 100, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pagina) {
        return ResponseEntity.ok().body(
                new BuscarPedidos().listarPedidosTodosPedidos(
                        pagina,
                        dadosPedidoRepository,
                        formaPagamentoRepository,
                        listaProdutosPedidoRepository
                )
        );
    }
}
