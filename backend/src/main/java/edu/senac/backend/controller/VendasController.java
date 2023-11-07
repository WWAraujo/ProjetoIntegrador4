package edu.senac.backend.controller;

import edu.senac.backend.produto.ProdutoRepository;
import edu.senac.backend.vendas.*;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/vendas")
public class VendasController {

//    @Autowired
//    private ProdutoRepository produtoRepository;
//
//    @Autowired
//    private DadosPedidoRepository dadosPedidoRepository;
//
//    @Autowired
//    private ListaProdutosPedidoRepository listaProdutosPedidoRepository;

    @Autowired @Setter
    private IConcluirPedido concluirPedido;

    @PostMapping
    public ResponseEntity<String> salvarVenda(@RequestBody PedidosRecord venda) {

        return ResponseEntity.ok(concluirPedido.ConcluirPedido(venda));
    }

//    @GetMapping
//    public ResponseEntity<List<PedidosRecord>>(){
//        return ResponseEntity.ok().build();
//    }
}
