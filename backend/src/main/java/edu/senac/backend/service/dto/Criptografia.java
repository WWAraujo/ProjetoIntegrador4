package edu.senac.backend.service.dto;

import java.util.Base64;

public class Criptografia {

    public Criptografia() {
    }

    public String encrypted (String senha) {

        senha = senha + "SENAC2023";

        String senhaCriptografada = Base64.getEncoder().encodeToString(senha.getBytes());

//        String comoDescriptografar = new String(Base64.getDecoder().decode(senhaCriptografada));

        return senhaCriptografada;
    }


}
