package edu.senac.backend.cliente;

import java.sql.Date;

public record ClienteRecord(
        Long id,
        String nomeCliente,
        String cpfCliente,
        String dataNascCliente,
        String generoCliente,
        String telefoneCliente,
        String emailCliente,
        String senhaCliente
){
}
