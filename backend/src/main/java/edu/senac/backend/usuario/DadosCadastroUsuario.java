package edu.senac.backend.usuario;

public record DadosCadastroUsuario(String email, String nome, String cpf, TipoUsuarioDTO tipoUsuario) {
}
