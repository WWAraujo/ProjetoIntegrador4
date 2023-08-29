package edu.senac.backend.usuario;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ConverterListaUsuarios {

    private Long id;
    private String nomeUsuario;
    private String emailUsuario;
    private String ativoInativo;
    private String tipoUsuario;


    public List<ConverterListaUsuarios> teste(List<UsuarioModel> usuarioModelList) {

        List<ConverterListaUsuarios> responses = new ArrayList<>();

        for (UsuarioModel converter: usuarioModelList){

            ConverterListaUsuarios usuarioResponseAtual = new ConverterListaUsuarios();

            usuarioResponseAtual.setId(converter.getId());
            usuarioResponseAtual.setNomeUsuario(converter.getNomeUsuario());
            usuarioResponseAtual.setEmailUsuario(converter.getEmailUsuario());
            usuarioResponseAtual.setAtivoInativo(converter.getAtivoInativo());
            usuarioResponseAtual.setTipoUsuario(alterartipousuario(converter.getTipoUsuario()));


            responses.add(usuarioResponseAtual);
        }

        return responses;
    }

    private String alterartipousuario(int tipoUsuario){

        String resposta = null;
        if (tipoUsuario == 1){
            resposta = "ADMINISTRADOR";
        } else if (tipoUsuario == 2){
            resposta = "ESTOQUISTA";
        } else {
            throw new RuntimeException("Erro no tipo de usuario");
        }
        return resposta;
    }
}
