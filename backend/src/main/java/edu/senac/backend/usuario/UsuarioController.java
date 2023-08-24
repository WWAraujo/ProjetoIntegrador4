//package edu.senac.backend.usuario;
//
//import edu.senac.backend.service.Criptografia;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/usuario")
//public class UsuarioController {
//
//    @Autowired
//    private UsuarioRepository repository;
//
//    @CrossOrigin(origins = "http://localhost:4200/")
//    @PostMapping
//    public void criarUsuario(@RequestBody DadosParaUsuario usuario) {
//        System.out.println(usuario);
//        repository.save(new UsuarioDTO(usuario));
//    }
//
//    @CrossOrigin(origins = "http://localhost:4200/")
//    @PostMapping
//    public UsuarioDTO buscarUsuario(@RequestBody UsuarioDTO usuario) {
//        UsuarioDTO usuarioDTO = repository.getReferenceById(usuario.getId());
//        usuarioDTO.setSenhaUsuario(new Criptografia().descriptar(usuarioDTO.getSenhaUsuario()));
//        return null;
//    }
//}
