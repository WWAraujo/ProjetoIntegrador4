package edu.senac.backend.usuario;

import edu.senac.backend.login.LoginModel;
import edu.senac.backend.login.LoginUsuarioRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@ActiveProfiles("test")
class UsuarioRepositoryTest {

    @Autowired
    private LoginUsuarioRepository loginUsuarioRepository;

    @Test
    @DisplayName("Verificar se o usuario mester foi cadastrado")
    void findByEmailUsuario() {
        Optional<LoginModel> login = loginUsuarioRepository.findByEmailUsuario("admin@admin");
        Assertions.assertNotNull(login);
        Assertions.assertEquals("admin@admin", login.get().getEmailUsuario());
        Assertions.assertEquals(1, login.get().getTipoUsuario());
        Assertions.assertNotNull(login.get().getId());
        Assertions.assertFalse(login.isEmpty());
    }
}