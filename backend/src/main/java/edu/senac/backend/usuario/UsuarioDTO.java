//package edu.senac.backend.usuario;
//
//import edu.senac.backend.service.Criptografia;
//import edu.senac.backend.usuario.DadosParaUsuario;
//import edu.senac.backend.service.TipoUsuario;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.*;
//
//@Table(name = "usuario")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@EqualsAndHashCode(of = "id")
//public class UsuarioDTO {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String nomeUsuario;
//    private String cpfUsuario;
//    private String emailUsuario;
//    private String senhaUsuario;
//    private TipoUsuario tipoUsuario;
//
//    public UsuarioDTO(DadosParaUsuario usuario) {
//        this.id = usuario.id();
//        this.nomeUsuario = usuario.nomeUsuario();
//        this.cpfUsuario = usuario.cpf();
//        this.emailUsuario = usuario.email();
//        this.senhaUsuario = new Criptografia().encriptar(usuario.senha());
//        this.tipoUsuario = usuario.tipoUsuario();
//    }
//
//}
