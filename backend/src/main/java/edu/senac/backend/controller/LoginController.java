package edu.senac.backend.controller;

import edu.senac.backend.login.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginRepository repository;


    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping()
    @Transactional
    public ResponseEntity<LoginResponse> salvarUsuario(@RequestBody LoginRecord login) {

        LoginModel lg = new LoginModel(login);

        LoginResponse loginResponse = repository.findIdAndTypeByEmailAndSenha(lg.getEmailUsuario(), lg.getSenhaUsuario());

        return ResponseEntity.ok(loginResponse);

    }
}
