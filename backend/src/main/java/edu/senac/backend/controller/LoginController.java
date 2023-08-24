package edu.senac.backend.controller;

import edu.senac.backend.login.DadosParaLogin;
import edu.senac.backend.login.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginRepository repository;


    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping()
    @Transactional
    public void salvarUsuario(@RequestBody DadosParaLogin login) {

        System.out.println(login);
//        repository.save(new Login(login));
//        var resposta = repository.fyndIdAndTypeByEmailAndSenha(login.usuario(), login.senha());

        Long id = Long.parseLong("1");
        var teste = repository.getReferenceById(id);
        System.out.println(teste);
    }
}
