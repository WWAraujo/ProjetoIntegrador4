package edu.senac.backend.usuario;

import edu.senac.backend.service.AlterarTipoUsuario;
import edu.senac.backend.service.AtivoInativo;
import edu.senac.backend.service.Criptografia;
import edu.senac.backend.service.TipoUsuario;
import jakarta.persistence.*;
import lombok.*;

import java.util.Optional;

@ToString
@Table(name = "login")
@Entity(name = "Usuario")
@Data
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
        this.tipoUsuario = new AlterarTipoUsuario().deEnumParaInt(usuario.tipoUsuario());
        this.senhaUsuario = new Criptografia().encriptar(usuario.senha());
        this.ativoInativo = AtivoInativo.ATIVO.toString();
    }

    public UsuarioModel(UsuarioRecordUPDATE usuario) {

        this.id = usuario.id();
        this.nomeUsuario = usuario.nomeUsuario();
        this.cpfUsuario = usuario.cpfUsuario();
        this.emailUsuario = usuario.emailUsuario();
        this.senhaUsuario = new Criptografia().encriptar(usuario.senhaUsuario());
        this.tipoUsuario = new AlterarTipoUsuario().deEnumParaInt(usuario.tipoUsuario());
        this.ativoInativo = usuario.ativoInativo().toString();
    }

    public UsuarioModel(UsuarioRecordDELETE usuario){

        this.id = usuario.id();
        this.nomeUsuario = usuario.nome();
        this.cpfUsuario = usuario.cpf();
        this.emailUsuario = usuario.email();
        this.tipoUsuario = new AlterarTipoUsuario().deEnumParaInt(usuario.tipoUsuario());
        this.senhaUsuario = usuario.senha();
        this.ativoInativo = usuario.ativoInativo().toString();
    }

    public UsuarioModel(Optional<UsuarioModel> usuarioModel) {

        if (usuarioModel.isPresent()) {
            this.id = usuarioModel.get().getId();
            this.nomeUsuario = usuarioModel.get().getNomeUsuario();
            this.cpfUsuario = usuarioModel.get().getCpfUsuario();
            this.emailUsuario = usuarioModel.get().getEmailUsuario();
            this.senhaUsuario = new Criptografia().descriptar(usuarioModel.get().getSenhaUsuario());
            this.tipoUsuario = usuarioModel.get().getTipoUsuario();
            this.ativoInativo = usuarioModel.get().getAtivoInativo();
        }
    }

}
