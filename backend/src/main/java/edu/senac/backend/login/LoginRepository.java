package edu.senac.backend.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoginRepository extends JpaRepository<LoginModel, Long> {

    @Query("SELECT l.id as id, l.tipoUsuario as tipoUsuario FROM Login l WHERE l.emailUsuario = :usuario AND l.senhaUsuario = :senha")
    LoginResponse findIdAndTypeByEmailAndSenha(String usuario, String senha);

}
