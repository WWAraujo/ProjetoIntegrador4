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
public class Login {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email_usuario;
    private String senha_usuario;

    public Login(DadosParaLogin login) {
        this.email_usuario = login.usuario();
        this.senha_usuario = new Criptografia().encriptar(login.senha());
    }
}
