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
public class VendasController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private DadosPedidoRepository dadosPedidoRepository;

    @Autowired
    private ListaProdutosPedidoRepository listaProdutosPedidoRepository;

    @PostMapping
    public ResponseEntity<String> salvarVenda(@RequestBody PedidosRecord venda) {

        String response = new ConcluirPedido().ConcluirPedido(venda, produtoRepository, dadosPedidoRepository, listaProdutosPedidoRepository);

        return ResponseEntity.ok(response);
    }

//    @GetMapping
//    public ResponseEntity<List<PedidosRecord>>(){
//        return ResponseEntity.ok().build();
//    }
}
