package edu.senac.backend.usuario;

import edu.senac.backend.service.AtivoInativo;
import edu.senac.backend.service.TipoUsuario;

import java.util.Optional;


public class DeletUser{

    public DeletUser(Long id, UsuarioRepository repository) {

        Optional<UsuarioModel> delete = repository.findById(id);

        delete.ifPresent(usuarioModel -> repository.save(
                new UsuarioModel(
                        new UsuarioRecordDELETE(
                                usuarioModel.getId(),
                                usuarioModel.getNomeUsuario(),
                                usuarioModel.getCpfUsuario(),
                                usuarioModel.getEmailUsuario(),
                                tipoUsuarioIntparaTipo(usuarioModel.getTipoUsuario()),
                                usuarioModel.getSenhaUsuario(),
                                converterAtivoInativo(usuarioModel.getAtivoInativo())))));
    }

    private TipoUsuario tipoUsuarioIntparaTipo(int tipoNumero) {

        TipoUsuario tipoUsuario = null;
        if (tipoNumero == 1){
            tipoUsuario = TipoUsuario.ADMINISTRADOR;
        } else if (tipoNumero == 2){
            tipoUsuario = TipoUsuario.ESTOQUISTA;
        } else {
            throw new RuntimeException("Erro no tipo de usuario");
        }
        return tipoUsuario;
    }

    private AtivoInativo converterAtivoInativo(String ativoInativo){

        AtivoInativo inativo = null;
        if (ativoInativo.equals("ATIVO")) {
            inativo = AtivoInativo.INATIVO;
        } else if (ativoInativo.equals("INATIVO")) {
            inativo = AtivoInativo.ATIVO;
        } else {
            throw new RuntimeException("Erro no ativo inativo");
        }
        return inativo;
    }
}
