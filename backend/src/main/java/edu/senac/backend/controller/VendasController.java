package edu.senac.backend.controller;

import edu.senac.backend.vendas.*;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/vendas")
public class VendasController {

    @Autowired @Setter
    private IConcluirPedido concluirPedido;

    @Autowired
    private DadosPedidoRepository dadosPedidoRepository;

    @Autowired
    private ListaProdutosPedidoRepository listaProdutosPedidoRepository;

    @Autowired
    private FormaPagamentoRepository formaPagamentoRepository;

    @PostMapping
    public ResponseEntity<String> salvarVenda(@RequestBody PedidosRecord venda) {
        return ResponseEntity.ok(concluirPedido.ConcluirPedido(venda));
    }

    @GetMapping("/{cliente}")
    public ResponseEntity<List<PedidosRecord>> getVendas(@PathVariable Long cliente){
        return ResponseEntity.ok().body(new ListarPedidos().listarPedido(
                cliente, dadosPedidoRepository, listaProdutosPedidoRepository, formaPagamentoRepository));
    }
}
