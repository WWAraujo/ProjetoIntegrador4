package edu.senac.backend.service;

import org.springframework.beans.factory.annotation.Autowired;

public class AlterarTipoUsuario {

    public int tipoUsuarioInt;
    public String tipoUsuarioString;
    public TipoUsuario tipoUsuarioEnum;


    public String deIntparaString(int tipo){

        if (tipo == 1){
            this.tipoUsuarioString = "ADMINISTRADOR";
        } else if (tipo == 2){
            this.tipoUsuarioString = "ESTOQUISTA";
        } else {
            throw new RuntimeException("Erro no tipo de usuario int não mapeado");
        }
        return this.tipoUsuarioString;
    }

    public TipoUsuario deIntparaEnum(int tipo){

        if (tipo == 1){
            this.tipoUsuarioEnum = TipoUsuario.ADMINISTRADOR;
        } else if (tipo == 2){
            this.tipoUsuarioEnum = TipoUsuario.ESTOQUISTA;
        } else {
            throw new RuntimeException("Erro no tipo de usuario int não mapeado");
        }
        return this.tipoUsuarioEnum;
    }

    public int deEnumParaInt(TipoUsuario tipoUsuario){

        if (tipoUsuario.equals(TipoUsuario.ADMINISTRADOR)){
            this.tipoUsuarioInt = 1;
        } else if (tipoUsuario.equals(TipoUsuario.ESTOQUISTA)){
            this.tipoUsuarioInt = 2;
        } else {
            throw new RuntimeException("Erro no tipo de usuario enum não mapeado");
        }

        return this.tipoUsuarioInt;
    }
}
