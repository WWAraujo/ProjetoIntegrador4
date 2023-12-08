package edu.senac.backend.usuario;

import edu.senac.backend.service.AlterarTipoUsuario;
import lombok.Data;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Data
public class ConverterListaUsuarios {

    private Long id;
    private String nomeUsuario;
    private String emailUsuario;
    private String ativoInativo;
    private String tipoUsuario;


    public LinkedList<ConverterListaUsuarios> converterUsuario(List<UsuarioModel> usuarioModelList) {

        LinkedList<ConverterListaUsuarios> responses = new LinkedList<>();

        for (UsuarioModel converter: usuarioModelList){

            ConverterListaUsuarios usuarioResponseAtual = new ConverterListaUsuarios();

            usuarioResponseAtual.setId(converter.getId());
            usuarioResponseAtual.setNomeUsuario(converter.getNomeUsuario());
            usuarioResponseAtual.setEmailUsuario(converter.getEmailUsuario());
            usuarioResponseAtual.setAtivoInativo(converter.getAtivoInativo());
            usuarioResponseAtual.setTipoUsuario( new AlterarTipoUsuario()
                    .deIntparaString(converter.getTipoUsuario()) );

            responses.add(usuarioResponseAtual);
        }

        return responses;
    }



}
