package edu.senac.backend.usuario;

import edu.senac.backend.service.TipoUsuario;

public record DadosCadastroUsuario(String email, String nome, String cpf, TipoUsuario tipoUsuario) {
}
