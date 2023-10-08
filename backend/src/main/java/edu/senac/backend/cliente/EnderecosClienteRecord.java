package edu.senac.backend.cliente;

public record EnderecosClienteRecord(
        Integer idCliente,
        Integer cep,
        String logradouro,
        Integer numero,
        String complemento,
        String bairro,
        String cidade,
        String uf
) {
}
