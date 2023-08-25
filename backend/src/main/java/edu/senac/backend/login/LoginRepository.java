package edu.senac.backend.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LoginRepository extends JpaRepository<Login, Long> {

    @Query("SELECT l.id as id, l.tipoUsuario as tipoUsuario FROM Login l WHERE l.emailUsuario = :usuario AND l.senhaUsuario = :senha")
    LoginProjection findIdAndTypeByEmailAndSenha(String usuario, String senha);

}
