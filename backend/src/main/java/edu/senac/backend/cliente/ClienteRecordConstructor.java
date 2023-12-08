package edu.senac.backend.cliente;

import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteRecord;

import java.util.List;

public record ClienteRecordConstructor(

        ClienteRecord cliente,

        List <EnderecosEntregasClienteRecord> enderecos
) {
}
