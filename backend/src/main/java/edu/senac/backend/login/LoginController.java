package edu.senac.backend.login;

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
    @PostMapping()
    @Transactional
    public void salvarUsuario(@RequestBody DadosParaLogin login) {
        System.out.println(login);
        repository.save(new Login(login));
    }

}
