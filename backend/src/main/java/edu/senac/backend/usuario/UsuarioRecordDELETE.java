package edu.senac.backend.usuario;

import edu.senac.backend.service.AtivoInativo;
import edu.senac.backend.service.TipoUsuario;

public record UsuarioRecordDELETE(
        Long id,
        String nome,
        String cpf,
        String email,
        TipoUsuario tipoUsuario,
        String senha) {
}
