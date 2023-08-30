package edu.senac.backend.controller;

import edu.senac.backend.service.TipoUsuario;
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


    //@CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping
    public void criarUsuario(@RequestBody UsuarioRecordCREATE usuario) {
        UsuarioModel teste = new UsuarioModel(usuario);
        System.out.println(teste);
        repository.save(teste);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @PutMapping
    public void buscarUsuario(@RequestBody UsuarioRecordUPDATE usuario) {
        repository.save(new UsuarioModel(usuario));
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping
    public List<ConverterListaUsuarios> listarUsuarios() {
        return new ConverterListaUsuarios().teste(repository.findAll());
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/{id}")
    public Optional<UsuarioModel> listarUsuario(@PathVariable Long id) {
        return repository.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:4200/")
    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id ) {

        System.out.println(id);

        Optional<UsuarioModel> delete = repository.findById(id);
        System.out.println(delete);

        if (delete.isPresent()) {
            repository.save(
                    new UsuarioModel(
                            new UsuarioRecordDELETE(
                                delete.get().getId(),
                                delete.get().getNomeUsuario(),
                                delete.get().getCpfUsuario(),
                                delete.get().getEmailUsuario(),
                                tipoUsuario(delete.get().getTipoUsuario()),
                                delete.get().getSenhaUsuario())));


        }
    }

    private TipoUsuario tipoUsuario (int tipoNumero) {

        TipoUsuario tipoUsuario = null;
        if (tipoNumero == 1){
            tipoUsuario = TipoUsuario.ADMINISTRADOR;
        } else if (tipoNumero == 2){
            tipoUsuario = TipoUsuario.ESTOQUISTA;
        } else {
            throw new RuntimeException("Erro no tipo de usuario");
        }
        return tipoUsuario;
    }

}
