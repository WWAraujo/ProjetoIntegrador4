package edu.senac.backend.enderecos.entrega;

public record EnderecosEntregasClienteRecord(
        Long id,
        Long idCliente,
        String cep,
        String logradouro,
        String numero,
        String complemento,
        String bairro,
        String cidade,
        String uf
) {
}
