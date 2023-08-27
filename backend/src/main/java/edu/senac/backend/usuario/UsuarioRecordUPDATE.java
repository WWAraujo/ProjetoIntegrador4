package edu.senac.backend.usuario;

import edu.senac.backend.service.AtivoInativo;
import edu.senac.backend.service.TipoUsuario;

public record UsuarioRecordUPDATE(String id, String nome, String cpf, String email, TipoUsuario tipoUsuario, String senha, AtivoInativo ativoInativo) {
}
