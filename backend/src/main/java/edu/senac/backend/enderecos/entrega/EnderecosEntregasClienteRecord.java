package edu.senac.backend.enderecos.entrega;

import edu.senac.backend.service.AtivoInativo;

public record EnderecosEntregasClienteRecord(
        Long id,
        Long idCliente,
        String cep,
        String logradouro,
        String numero,
        String complemento,
        String bairro,
        String cidade,
        String uf,
        String enderecoPrincipal,
        String ativoInativo
) {
}
