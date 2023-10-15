package edu.senac.backend.controller;

import edu.senac.backend.cliente.*;
import edu.senac.backend.produto.FotosProdutoModel;
import edu.senac.backend.produto.FotosProdutoRecord;
import edu.senac.backend.produto.ProdutoModel;
import edu.senac.backend.produto.ProdutoRecordConstructor;
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

        ClienteModel clienteSalvo = repository.save(new ClienteModel(cliente));

        for (EnderecosClienteRecord enderecoRecord : cliente.enderecos()){
            EnderecosClienteModel enderecosClienteModel =
                    new EnderecosClienteModel (clienteSalvo, enderecoRecord);
            enderecosClienteRepository.save(enderecosClienteModel);
        }

        return ResponseEntity.ok(clienteSalvo.getId());
    }

    @GetMapping("/buscarid/{id}")
    public Optional<ClienteModel> buscarCliente(@PathVariable Long id){
        return repository.findById(id);
    }

    @GetMapping("/buscaremail/{email}")
    public Boolean listarCliente(@PathVariable String email) {
        return repository.findByEmailCliente(email).isPresent();
    }

    @PutMapping("/alterar")
    public ResponseEntity<Long> alterarCliente(@RequestBody ClienteRecordConstructor cliente) {

        ClienteModel clienteSalvo = repository.save(new ClienteModel(cliente));

        repository.deleteByEnderecosId(clienteSalvo.getId());

        for (EnderecosClienteRecord enderecoRecord : cliente.enderecos()){
            EnderecosClienteModel enderecosClienteModel =
                    new EnderecosClienteModel (clienteSalvo, enderecoRecord);
            enderecosClienteRepository.save(enderecosClienteModel);
        }

        return ResponseEntity.ok(clienteSalvo.getId());
    }

}
