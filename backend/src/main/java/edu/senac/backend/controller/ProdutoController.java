package edu.senac.backend.controller;

import edu.senac.backend.produto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private AvaliacaoProdutoRepository avaliacaoProdutoRepository;

    @Autowired
    private FotosProdutoRepository fotosProdutoRepository;

    @GetMapping("/listar")
    public Page<ProdutoModel> listarProdutos(@PageableDefault(size = 10, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pagina) {
        return produtoRepository.findAll(pagina);
    }

    @GetMapping("/buscarid/{id}")
    public Optional<ProdutoModel> buscarProduto(@PathVariable Integer id) {
        return produtoRepository.findById(id);
    }

    @GetMapping("/buscarproduto/{pesquisa}")
    public LinkedList<ProdutoModel> buscarProduto(@PathVariable String pesquisa) {
        return produtoRepository.pesquisarPorNome(pesquisa);
    }

    @DeleteMapping("/{id}/{status}")
    public ResponseEntity deleteProduto(@PathVariable Long id, @PathVariable String status) {
        System.out.println("Chegou id :" + id + " Status : " + status);

        new DeletProdutc(status, id, produtoRepository);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/alterar-produto")
    public ResponseEntity<Long> alterarProduto(@RequestBody ProdutoRecordConstructor produto) {

        ProdutoModel produtoModel = new ProdutoModel(produto);
        ProdutoModel produtoSalvo = produtoRepository.save(produtoModel);

        fotosProdutoRepository.deleteByProdutoId(produtoSalvo.getId());

        for (FotosProdutoRecord fotoRecord : produto.fotosProdutoRecord()) {
            FotosProdutoModel fotosProdutoModel =
                    new FotosProdutoModel(produtoSalvo, fotoRecord);
            fotosProdutoRepository.save(fotosProdutoModel);
        }

        return ResponseEntity.ok(produtoSalvo.getId());
    }

    @GetMapping("/mostrar-produto-completo/{id}")
    public ResponseEntity<ProdutoRecordConstructor> mostrarProdutoCompleto(@PathVariable Long id) {
        return ResponseEntity.ok(new MostrarProdutoCompleto().response(produtoRepository, fotosProdutoRepository, id));
    }

    @GetMapping("/listar-todos-produtos")
    public ResponseEntity<LinkedList<ProdutoRecordConstructor>> listarTodosProdutos() {
        return new ResponseEntity<>(
                new ListarTodosProdutos()
                        .ListarTodosProdutos(produtoRepository, fotosProdutoRepository), HttpStatus.OK);
    }

    @PostMapping("/cadastrar-produto")
    public ResponseEntity<Long> cadastrarProduto(@RequestBody ProdutoRecordConstructor produto) {

        ProdutoModel produtoSalvo = produtoRepository.save(new ProdutoModel(produto));

        for (FotosProdutoRecord fotoRecord : produto.fotosProdutoRecord()) {
            FotosProdutoModel fotosProdutoModel =
                    new FotosProdutoModel(produtoSalvo, fotoRecord);
            fotosProdutoRepository.save(fotosProdutoModel);
        }
        Long idProdutoSalvo = Long.parseLong(String.valueOf(produtoSalvo.getId()));
        return ResponseEntity.ok(idProdutoSalvo);
    }
}