package edu.senac.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class AlterarTipoUsuarioTest {


    @Test
    void deIntparaString() {
        String response = new AlterarTipoUsuario().deIntparaString(1);
        Assertions.assertEquals("ADMINISTRADOR", response);

        response = new AlterarTipoUsuario().deIntparaString(2);
        Assertions.assertEquals("ESTOQUISTA", response);
    }

    @Test
    void deIntparaEnum() {
        TipoUsuario response = new AlterarTipoUsuario().deIntparaEnum(1);
        Assertions.assertEquals(TipoUsuario.ADMINISTRADOR, response);

        response = new AlterarTipoUsuario().deIntparaEnum(2);
        Assertions.assertEquals(TipoUsuario.ESTOQUISTA, response);
    }

    @Test
    void deEnumParaInt() {
        int response = new AlterarTipoUsuario().deEnumParaInt(TipoUsuario.ADMINISTRADOR);
        Assertions.assertEquals(1,response);

        response = new AlterarTipoUsuario().deEnumParaInt(TipoUsuario.ESTOQUISTA);
        Assertions.assertEquals(2,response);
    }
}