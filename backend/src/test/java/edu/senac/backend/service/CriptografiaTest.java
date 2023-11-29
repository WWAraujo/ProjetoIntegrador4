package edu.senac.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;


class CriptografiaTest {

    @Test
    void encriptar () {
        String test = new Criptografia().encriptar("123");
        Assertions.assertEquals("MTIzU0VOQUMyMDIz", test);
    }

    @Test
    void descriptar (){
        String encrip = new Criptografia().encriptar("123");
        String test = new Criptografia().descriptar(encrip);
        Assertions.assertEquals("123", test);
    }

}