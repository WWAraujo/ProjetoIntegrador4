package edu.senac.backend.controller;

import edu.senac.backend.produto.ProdutoModel;
import edu.senac.backend.produto.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/listar")
    public Page<ProdutoModel> listarProdutos (@PageableDefault(size = 10, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pagina) {
        return repository.findAll(pagina);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/buscarid/{id}")
    public Optional<ProdutoModel> buscarUsuario(@PathVariable Integer id) {
        return repository.findById(id);
    }


}
