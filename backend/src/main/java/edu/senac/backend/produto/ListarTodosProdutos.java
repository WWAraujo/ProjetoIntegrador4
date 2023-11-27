package edu.senac.backend.produto;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ListarTodosProdutos {
    public List<ProdutoRecordConstructor> ListarTodosProdutos(
            ProdutoRepository produtoRepository,
            FotosProdutoRepository fotosProdutoRepository
    ) {
        List<ProdutoRecordConstructor> produtosRecordList = new ArrayList<>();
        List<ProdutoModel> produtosModel = produtoRepository.findAll();

        for (ProdutoModel produtoModel : produtosModel) {
            ProdutoRecord produtoRecord =
                    new ProdutoRecord(
                            produtoModel.getId(),
                            produtoModel.getNomeProduto(),
                            produtoModel.getDescricaoDetalhadaProduto(),
                            produtoModel.getPrecoProduto(),
                            produtoModel.getQtdEstoque(),
                            produtoModel.getAtivoInativo(),
                            produtoModel.getAvaliacao()
                    );


            List<FotosProdutoRecord> fotosresponse = new ArrayList<>();
            Optional<FotosProdutoModel[]> fotosProdutoModelOptional = fotosProdutoRepository.buscarFotosPorIdProduto(produtoModel.getId());
            if (fotosProdutoModelOptional.isPresent()) {
                FotosProdutoModel[] fotosProdutoModel = fotosProdutoModelOptional.get();

                for (FotosProdutoModel fotos : fotosProdutoModel) {
                    FotosProdutoRecord foto = new FotosProdutoRecord(
                            Integer.parseInt(fotos.getIdProduto().toString()),
                            fotos.getNomeImg(),
                            fotos.getCaminhoImg(),
                            fotos.getFlagImg()
                    );
                    fotosresponse.add(foto);
                }
            }
            produtosRecordList.add(new ProdutoRecordConstructor(produtoRecord,fotosresponse));
        }

        return produtosRecordList;
    }
}
