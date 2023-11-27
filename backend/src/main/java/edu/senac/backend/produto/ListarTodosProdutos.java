package edu.senac.backend.produto;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

public class ListarTodosProdutos {
    public LinkedList<ProdutoRecordConstructor> ListarTodosProdutos(
            ProdutoRepository produtoRepository,
            FotosProdutoRepository fotosProdutoRepository
    ) {
        LinkedList<ProdutoRecordConstructor> produtosRecordList = new LinkedList<>();
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


            LinkedList<FotosProdutoRecord> fotosresponse = new LinkedList<>();
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
