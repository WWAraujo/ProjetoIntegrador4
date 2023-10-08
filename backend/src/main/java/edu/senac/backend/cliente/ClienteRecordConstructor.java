package edu.senac.backend.cliente;

import java.util.List;

public record ClienteRecordConstructor(

        ClienteRecord cliente,

        List <EnderecosClienteRecord> enderecos
) {
}
