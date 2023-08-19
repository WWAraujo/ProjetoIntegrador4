package edu.senac.backend.login;

import edu.senac.backend.service.Criptografia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "logins")
@Entity(name = "Login")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Login {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String usuario;
    private String senha;

    public Login(DadosParaLogin login) {
        this.usuario = login.usuario();
        this.senha = new Criptografia().Encrypted(login.senha());
    }
}
