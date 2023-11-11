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

    @PostMapping("/cadastrar")
    public ResponseEntity<String> salvarVenda(@RequestBody PedidosRecord venda) {
        return ResponseEntity.ok(concluirPedido.ConcluirPedido(venda));
    }

//    @PostMapping("/cadastrar-vendas/{id}")
//    public ResponseEntity<Long> salvarVenda(@PathVariable Long id) {
//        System.out.println("Entrou no POST");
//        return ResponseEntity.ok(id);
//    }

    @GetMapping("/{cliente}")
    public ResponseEntity<Long> getVendas(@PathVariable Long cliente){
//        return ResponseEntity.ok().body(new ListarPedidos().listarPedido(cliente, dadosPedidoRepository, listaProdutosPedidoRepository, formaPagamentoRepository)); List<PedidosRecord>
        System.out.println("Entrou no GET");
        return ResponseEntity.ok().body(cliente);
    }
}
