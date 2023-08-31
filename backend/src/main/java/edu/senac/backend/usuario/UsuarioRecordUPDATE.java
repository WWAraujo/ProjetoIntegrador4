package edu.senac.backend.usuario;

import edu.senac.backend.service.AtivoInativo;
import edu.senac.backend.service.TipoUsuario;

public record UsuarioRecordUPDATE(
        Long id,
        String nomeUsuario,
        String cpfUsuario,
        String emailUsuario,
        TipoUsuario tipoUsuario,
        String senhaUsuario,
        AtivoInativo ativoInativo) {
}
