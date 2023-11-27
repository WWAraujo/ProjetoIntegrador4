package edu.senac.backend.produto;


import java.util.LinkedList;
import java.util.Optional;

public class MostrarProdutoCompleto {

    public ProdutoRecordConstructor response(
            ProdutoRepository produtoRepository,
            FotosProdutoRepository fotosProdutoRepository,
            Long id
    ){

        Optional<ProdutoModel> produtoModel = produtoRepository.findById(Integer.parseInt(id.toString()));
        ProdutoRecord produtoRecord =
                new ProdutoRecord(
                        produtoModel.get().getId(),
                        produtoModel.get().getNomeProduto(),
                        produtoModel.get().getDescricaoDetalhadaProduto(),
                        produtoModel.get().getPrecoProduto(),
                        produtoModel.get().getQtdEstoque(),
                        produtoModel.get().getAtivoInativo(),
                        produtoModel.get().getAvaliacao()
                );


        LinkedList<FotosProdutoRecord> fotosresponse = new LinkedList<>();
        Optional<FotosProdutoModel[]> fotosProdutoModel = fotosProdutoRepository.buscarFotosPorIdProduto(id);
        for (FotosProdutoModel fotos : fotosProdutoModel.get()) {
            FotosProdutoRecord foto =
                    new FotosProdutoRecord(
                            Integer.parseInt(fotos.getIdProduto().toString()),
                            fotos.getNomeImg(),
                            fotos.getCaminhoImg(),
                            fotos.getFlagImg()
                    );
            fotosresponse.add(foto);
        }


        ProdutoRecordConstructor response = new ProdutoRecordConstructor(produtoRecord, fotosresponse);

        return response;
    }

}
