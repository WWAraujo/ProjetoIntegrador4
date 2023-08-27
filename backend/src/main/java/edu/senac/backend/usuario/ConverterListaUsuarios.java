package edu.senac.backend.usuario;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

@Data
public class ConverterListaUsuarios {

    private Long id;
    private String nomeUsuario;
    private String emailUsuario;
    private String ativoInativo;


    public List<ConverterListaUsuarios> teste(List<UsuarioModel> usuarioModelList) {

        List<ConverterListaUsuarios> responses = new ArrayList<>();

        for (UsuarioModel converter: usuarioModelList){

            ConverterListaUsuarios usuarioResponseAtual = new ConverterListaUsuarios();

            usuarioResponseAtual.setId(converter.getId());
            usuarioResponseAtual.setNomeUsuario(converter.getNomeUsuario());
            usuarioResponseAtual.setEmailUsuario(converter.getEmailUsuario());
            usuarioResponseAtual.setAtivoInativo(converter.getAtivoInativo());

            responses.add(usuarioResponseAtual);
        }

        return responses;
    }
}
