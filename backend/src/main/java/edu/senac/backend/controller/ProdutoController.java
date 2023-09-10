package edu.senac.backend.controller;

import edu.senac.backend.produto.*;
import edu.senac.backend.usuario.DeletUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @Autowired
    private AvaliacaoProdutoRepository avaliacaoProdutoRepository;

    @Autowired
    private FotosProdutoRepository fotosProdutoRepository;

    @GetMapping("/listar")
    public Page<ProdutoModel> listarProdutos (@PageableDefault(size = 10, sort = {"id"}, direction = Sort.Direction.DESC) Pageable pagina) {
        return repository.findAll(pagina);
    }

    @GetMapping("/buscarid/{id}")
    public Optional<ProdutoModel> buscarUsuario(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @GetMapping("/buscarproduto/{pesquisa}")
    public List<ProdutoModel> buscarProduto(@PathVariable String pesquisa) {
        return repository.pesquisarPorNome(pesquisa);
    }

    @DeleteMapping("/{id}/{status}")
    public ResponseEntity deleteProduto(@PathVariable Long id, @PathVariable String status) {
        System.out.println("Chegou id :" + id + " Status : " + status);

        new DeletProdutc(status ,id, repository);
        return  ResponseEntity.noContent().build();
    }


    @PostMapping("/cadastrar-produto")
    public ResponseEntity<Long> cadastrarProduto(@RequestBody ProdutoRecordConstructor produto) {

        System.out.println(produto);

        ProdutoModel produtoModel = new ProdutoModel(produto);

        ProdutoModel produtoSalvo = repository.save(produtoModel);


        AvaliacaoProdutoModel avaliacaoProdutoModel  =
                new AvaliacaoProdutoModel(produtoSalvo, produto.avaliacaoProdutoRecord());
        avaliacaoProdutoRepository.save(avaliacaoProdutoModel);

        for (FotosProdutoRecord fotoRecord : produto.fotosProdutoRecord()) {
            FotosProdutoModel fotosProdutoModel =
                    new FotosProdutoModel(produtoSalvo, fotoRecord);
            fotosProdutoRepository.save(fotosProdutoModel);
        }


        Long idProdutoSalvo = Long.parseLong(String.valueOf(produtoSalvo.getId()));
        return ResponseEntity.ok(idProdutoSalvo);
    }

    @GetMapping("/mostrar-produto-completo/{id}")
    public ResponseEntity<ProdutoRecordConstructor> mostrarProdutoCompleto(@PathVariable Long id) {

        Optional<ProdutoModel> produtoModel = repository.findById(Integer.parseInt(id.toString()));
        ProdutoRecord produtoRecord = new ProdutoRecord(
                produtoModel.get().getId(),
                produtoModel.get().getNomeProduto(),
                produtoModel.get().getDescricaoDetalhadaProduto(),
                produtoModel.get().getPrecoProduto(),
                produtoModel.get().getQtdEstoque(),
                produtoModel.get().getAtivoInativo()
        );


        AvaliacaoProdutoRecord avaliacaoProdutoRecord =
                new AvaliacaoProdutoRecord(
                        id.toString(),
                        avaliacaoProdutoRepository.calcularMediaAvaliacao(id));


        Optional<FotosProdutoModel[]> fotosProdutoModel = fotosProdutoRepository.buscarFotosPorIdProduto(id);
        List<FotosProdutoRecord> fotosresponse = new ArrayList<>();
        for (FotosProdutoModel fotos : fotosProdutoModel.get()){
            FotosProdutoRecord foto = new FotosProdutoRecord(
                    Integer.parseInt(fotos.getIdProduto().toString()),
                    fotos.getNomeImg(),
                    fotos.getCaminhoImg(),
                    fotos.getFlagImg()
            );
            fotosresponse.add(foto);
        }


        ProdutoRecordConstructor response = new ProdutoRecordConstructor(produtoRecord, avaliacaoProdutoRecord, fotosresponse);

        return ResponseEntity.ok(response);
    }

}
