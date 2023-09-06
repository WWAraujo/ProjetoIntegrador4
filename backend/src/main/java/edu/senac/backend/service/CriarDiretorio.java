package edu.senac.backend.service;

import java.io.File;

public class CriarDiretorio {
    public static void main(String[] args) {

        String caminhoDiretorio = System.getProperty("user.dir") + File.separator + "uploads";


        File diretorio = new File(caminhoDiretorio);


        if (!diretorio.exists()) {

            boolean criadoComSucesso = diretorio.mkdirs();

            if (criadoComSucesso) {
                System.out.println("Diretório criado com sucesso.");
            } else {
                System.out.println("Falha ao criar o diretório.");
            }
        } else {
            System.out.println("O diretório já existe.");
        }
    }
}

