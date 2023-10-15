package edu.senac.backend.login;

import edu.senac.backend.service.Criptografia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "login")
@Entity(name = "Login")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class LoginModel {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emailUsuario;
    private String senhaUsuario;


    private int tipoUsuario;

    public LoginModel(LoginRecord login) {
        this.emailUsuario = login.usuario();
        this.senhaUsuario = new Criptografia().encriptar(login.senha());
    }

}
