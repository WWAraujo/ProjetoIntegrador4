package edu.senac.backend.controller;

import edu.senac.backend.usuario.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;


    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping
    public void criarUsuario(@RequestBody UsuarioRecordCREATE usuario) {
        repository.save(new UsuarioModel(usuario));
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @PutMapping
    public void buscarUsuario(@RequestBody UsuarioRecordUPDATE usuario) {
        repository.save(new UsuarioModel(usuario));
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping
    public List<ConverterListaUsuarios> listarUsuario() {
        return new ConverterListaUsuarios().teste(repository.findAll());
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @DeleteMapping
    public void deleteUsuario(@RequestBody UsuarioRecordDELETE delete) {
        repository.save(new UsuarioModel(delete));
    }

}
