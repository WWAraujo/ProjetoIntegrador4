package edu.senac.backend.usuario;

import edu.senac.backend.service.AlterarTipoUsuario;
import edu.senac.backend.service.Criptografia;
import edu.senac.backend.service.TipoUsuario;
import lombok.ToString;

import java.util.Optional;

@ToString
public class PrepararUsuarioParaAlterar {

    private Long id;
    private String nomeUsuario;
    private String cpfUsuario;
    private String emailUsuario;
    private String senhaUsuario;
    private TipoUsuario tipoUsuario;
    private String ativoInativo;

    public PrepararUsuarioParaAlterar(Optional<UsuarioModel> usuarioModel) {

        if (usuarioModel.isPresent()) {
            this.id = usuarioModel.get().getId();
            this.nomeUsuario = usuarioModel.get().getNomeUsuario();
            this.cpfUsuario = usuarioModel.get().getCpfUsuario();
            this.emailUsuario = usuarioModel.get().getEmailUsuario();
            this.senhaUsuario = new Criptografia().descriptar(usuarioModel.get().getSenhaUsuario());
            this.tipoUsuario = new AlterarTipoUsuario().deIntparaEnum(usuarioModel.get().getTipoUsuario());
            this.ativoInativo = usuarioModel.get().getAtivoInativo();
        }
    }
}
