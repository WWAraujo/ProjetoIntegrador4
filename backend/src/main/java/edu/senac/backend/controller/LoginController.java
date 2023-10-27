package edu.senac.backend.controller;

import edu.senac.backend.cliente.ClienteModel;
import edu.senac.backend.cliente.ClienteRepository;
import edu.senac.backend.login.LoginModel;
import edu.senac.backend.login.LoginRecord;
import edu.senac.backend.login.LoginUsuarioRepository;
import edu.senac.backend.service.Criptografia;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<LoginModel> salvarUsuario(@RequestBody LoginRecord login) {

        String senha = new Criptografia().encriptar(login.senha());

        Optional<LoginModel> loginModel = UsuarioRepository.findByEmailUsuario(login.usuario());

        LoginModel response = loginModel.get();

        if (verificarSenha(loginModel.get().getSenhaUsuario(), senha)) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cliente")
    @Transactional
    public ResponseEntity<ClienteModel> salvarCliente(@RequestBody LoginRecord loginCliente) {

        String senha = new Criptografia().encriptar(loginCliente.senha());
        Optional<ClienteModel> clienteModel = ClienteRepository.findByEmailCliente(loginCliente.usuario());
        ClienteModel response = clienteModel.get();

        if (verificarSenha(clienteModel.get().getSenhaCliente(), senha)) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    private boolean verificarSenha (String senha1, String senha2){
        return senha1.equals(senha2);
    }
}
