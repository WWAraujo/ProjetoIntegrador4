package edu.senac.backend.service;

import java.util.Base64;

public class Criptografia {

    public String Encrypted (String senha) {
        senha = senha + "SENAC2023";
        return Base64.getEncoder().encodeToString(senha.getBytes());
    }
}
