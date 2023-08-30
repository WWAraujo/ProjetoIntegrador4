package edu.senac.backend.usuario;

import edu.senac.backend.service.AtivoInativo;
import edu.senac.backend.service.Criptografia;
import edu.senac.backend.service.TipoUsuario;
import jakarta.persistence.*;
import lombok.*;

@ToString
@Table(name = "login")
@Entity(name = "Usuario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeUsuario;
    private String cpfUsuario;
    private String emailUsuario;
    private String senhaUsuario;
    private int tipoUsuario;
    private String ativoInativo;

    public UsuarioModel(UsuarioRecordCREATE usuario) {

        this.nomeUsuario = usuario.nome();
        this.cpfUsuario = usuario.cpf();
        this.emailUsuario = usuario.email();
        tipoDeUsuarioParaSalvarNoBanco(usuario.tipoUsuario());
        this.senhaUsuario = new Criptografia().encriptar(usuario.senha());
        this.ativoInativo = AtivoInativo.ATIVO.toString();
    }

    public UsuarioModel(UsuarioRecordUPDATE usuario) {

        this.id = Long.parseLong(usuario.id());
        this.nomeUsuario = usuario.nome();
        this.cpfUsuario = usuario.cpf();
        this.emailUsuario = usuario.email();
        this.senhaUsuario = new Criptografia().encriptar(usuario.senha());
        tipoDeUsuarioParaSalvarNoBanco(usuario.tipoUsuario());
        this.ativoInativo = usuario.ativoInativo().toString();
    }

    public UsuarioModel(UsuarioRecordDELETE usuario){
        this.id = usuario.id();
        this.nomeUsuario = usuario.nome();
        this.cpfUsuario = usuario.cpf();
        this.emailUsuario = usuario.email();
        this.senhaUsuario = usuario.senha();
        tipoDeUsuarioParaSalvarNoBanco(usuario.tipoUsuario());
        this.ativoInativo = AtivoInativo.INATIVO.toString();
    }

    private void tipoDeUsuarioParaSalvarNoBanco(TipoUsuario tipoUsuario){

        if (tipoUsuario.equals(TipoUsuario.ADMINISTRADOR)){
            this.tipoUsuario = 1;
        } else if (tipoUsuario.equals(TipoUsuario.ESTOQUISTA)){
            this.tipoUsuario = 2;
        } else {
            throw new RuntimeException("Erro no tipo de usuario");
        }
    }

}
