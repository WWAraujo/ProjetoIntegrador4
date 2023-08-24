package edu.senac.backend.login;

import edu.senac.backend.usuario.TipoUsuario;

public record ResponseLogin(Long id, TipoUsuario tipoUsuario) {
}
