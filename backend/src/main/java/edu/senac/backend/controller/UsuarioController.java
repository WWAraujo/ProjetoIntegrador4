package edu.senac.backend.controller;

import edu.senac.backend.usuario.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;


    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping
    public UsuarioModel criarUsuario(@RequestBody UsuarioRecordCREATE usuario) {
        return repository.save(new UsuarioModel(usuario));
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @PutMapping
    public void buscarUsuario(@RequestBody UsuarioRecordUPDATE usuario) {
        System.out.println(usuario);
        repository.save(new UsuarioModel(usuario));
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping
    public List<ConverterListaUsuarios> listarUsuarios() {
        return new ConverterListaUsuarios().converterUsuario(repository.findAll());
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/buscarid/{id}")
    public Optional<UsuarioModel> buscarUsuario(@PathVariable Long id) {

        Optional<UsuarioModel> response = repository.findById(id);
        System.out.println(response);

        return repository.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id ) {

        new DeletUser(id , repository);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/buscaremail/{email}")
    public Boolean listarUsuario(@PathVariable String email) {
        boolean respose = repository.findByEmailUsuario(email).isPresent();
        return respose;
    }


}
