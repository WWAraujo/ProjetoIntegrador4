package edu.senac.backend.produto;

import static edu.senac.backend.service.AtivoInativo.*;

public class DeletProdutc {
    public DeletProdutc(String status, Long id, ProdutoRepository repository) {

        if (status.equalsIgnoreCase("INATIVO")){
            System.out.println("entrou como inativo");
            repository.updateStatusToAtivoInativo("ATIVO", id);
        } else {
            System.out.println("entrou como ativo ");
            repository.updateStatusToAtivoInativo("INATIVO", id);
        }
    }
}
