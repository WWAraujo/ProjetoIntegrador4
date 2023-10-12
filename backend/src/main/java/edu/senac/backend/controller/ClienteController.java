package edu.senac.backend.controller;

import edu.senac.backend.cliente.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @Autowired
    private EnderecosClienteRepository enderecosClienteRepository;

    @PostMapping("/cadastrar-cliente")
    public ResponseEntity<Long> cadastrarCliente(@RequestBody ClienteRecordConstructor cliente){
        System.out.println(" Valor que chegou "+cliente);
        ClienteModel clienteSalvo = repository.save(new ClienteModel(cliente));

        for (EnderecosClienteRecord enderecoRecord : cliente.enderecos()){
            EnderecosClienteModel enderecosClienteModel =
                    new EnderecosClienteModel (clienteSalvo, enderecoRecord);
            enderecosClienteRepository.save(enderecosClienteModel);
        }

        Long idClienteSalvo = Long.parseLong(String.valueOf(clienteSalvo.getId()));
        return ResponseEntity.ok(idClienteSalvo);
    }

    @GetMapping("/buscarid/{id}")
    public Optional<ClienteModel> buscarCliente(@PathVariable Long id){
        return repository.findById(id);
    }

    @GetMapping("/buscaremail/{email}")
    public Boolean listarCliente(@PathVariable String email) {
        return repository.findByEmailCliente(email).isPresent();
    }

}
