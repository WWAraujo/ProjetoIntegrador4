package edu.senac.backend.controller;

import edu.senac.backend.cliente.ClienteModel;
import edu.senac.backend.cliente.ClienteRecord;
import edu.senac.backend.cliente.ClienteRepository;
import edu.senac.backend.login.*;
import edu.senac.backend.service.Criptografia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginUsuarioRepository UsuarioRepository;

    @Autowired
    private ClienteRepository ClienteRepository;

    @PostMapping("/usuario")
    @Transactional
    public ResponseEntity<LoginUsuarioResponse> salvarUsuario(@RequestBody LoginRecord login) {

        LoginModel lg = new LoginModel(login);

        LoginUsuarioResponse loginUsuarioResponse = UsuarioRepository.findIdAndTypeByEmailAndSenha(lg.getEmailUsuario(), lg.getSenhaUsuario());

        return ResponseEntity.ok(loginUsuarioResponse);

    }

    @PostMapping("/cliente")
    @Transactional
    public ResponseEntity<ClienteModel> salvarCliente(@RequestBody LoginRecord loginCliente) {

        String senha = new Criptografia().encriptar(loginCliente.senha());
        Optional<ClienteModel> loginResponse = ClienteRepository.findByEmailCliente(loginCliente.usuario());
        ClienteModel response;
        response = loginResponse.get();
        if (loginResponse.get().getSenhaCliente().equals(senha)) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}
