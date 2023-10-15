package edu.senac.backend.controller;

import edu.senac.backend.usuario.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public UsuarioModel criarUsuario(@RequestBody UsuarioRecordCREATE usuario) {
        return repository.save(new UsuarioModel(usuario));
    }

    @PutMapping
    public void buscarUsuario(@RequestBody UsuarioRecordUPDATE usuario) {
        repository.save(new UsuarioModel(usuario));
    }

    @GetMapping
    public List<ConverterListaUsuarios> listarUsuarios() {
        return new ConverterListaUsuarios().converterUsuario(repository.findAll());
    }

    @GetMapping("/buscarid/{id}")
    public Optional<UsuarioModel> buscarUsuario(@PathVariable Long id) {
        return repository.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id ) {
        new DeletUser(id , repository);
    }

    @GetMapping("/buscaremail/{email}")
    public Boolean listarUsuario(@PathVariable String email) {
        return repository.findByEmailUsuario(email).isPresent();
    }


}
