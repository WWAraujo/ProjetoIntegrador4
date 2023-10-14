package edu.senac.backend.cliente;

public record EnderecosClienteRecord(
        Long id,
        Integer idCliente,
        String cep,
        String logradouro,
        String numero,
        String complemento,
        String bairro,
        String cidade,
        String uf
) {
}
