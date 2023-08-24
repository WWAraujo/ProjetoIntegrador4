package edu.senac.backend.login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoginRepository extends JpaRepository<Login, Long> {

//    @Query("""
//            select id, tipoUsuario
//            from login
//            where
//            emailUsuario = ?1
//            and
//            senhaUsuario = ?2
//        """)
//    ResponseLogin fyndIdAndTypeByEmailAndSenha(String usuario, String senha);
}
