package edu.senac.backend.usuario;

import edu.senac.backend.service.TipoUsuario;

public record UsuarioRecordCREATE(
        String nome,
        String cpf,
        String email,
        TipoUsuario tipoUsuario,
        String senha) {
}
