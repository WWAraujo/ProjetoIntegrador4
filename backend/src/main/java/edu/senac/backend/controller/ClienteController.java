package edu.senac.backend.controller;

import edu.senac.backend.cliente.*;
import edu.senac.backend.cliente.LoginClienteResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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
    public ResponseEntity<ClienteRecordConstructor> buscarCliente(@PathVariable Long id){

        ClienteModel clienteModel = new ClienteModel(repository.findById(id));

        List<EnderecosClienteModel> endereco = (enderecosClienteRepository.findIdByIdCliente(clienteModel.getId()));

        ClienteRecordConstructor cliente = getClienteRecordConstructor(clienteModel, endereco);

        return ResponseEntity.ok(cliente);
    }

    private static ClienteRecordConstructor getClienteRecordConstructor(ClienteModel clienteModel, List<EnderecosClienteModel> endereco ) {

        ClienteRecord clienteRecord = new ClienteRecord(
                clienteModel.getId(),
                clienteModel.getNomeCliente(),
                clienteModel.getCpfCliente(),
                clienteModel.getDatanascCliente(),
                clienteModel.getGeneroCliente(),
                clienteModel.getTelefoneCliente(),
                clienteModel.getEmailCliente(),
                clienteModel.getSenhaCliente());

        List<EnderecosClienteRecord> enderecos = new ArrayList<>();

        for (EnderecosClienteModel end : endereco){
            EnderecosClienteRecord enderecoAtual = new EnderecosClienteRecord(
                    end.getId(),
                    end.getIdCliente(),
                    end.getCep(),
                    end.getLogradouro(),
                    end.getNumero(),
                    end.getComplemento(),
                    end.getBairro(),
                    end.getCidade(),
                    end.getUf());
            enderecos.add(enderecoAtual);
        }

        ClienteRecordConstructor cliente = new ClienteRecordConstructor(clienteRecord,enderecos);
        return cliente;
    }

    @GetMapping("/buscaremail/{email}")
    public Boolean listarCliente(@PathVariable String email) {
        return repository.findByEmailCliente(email).isPresent();
    }

    @PostMapping("/login-cliente")
    @Transactional
    public ResponseEntity<LoginClienteResponse> salvarCliente(@RequestBody ClienteRecord loginCliente) {

        ClienteModel lg = new ClienteModel(loginCliente);
        LoginClienteResponse loginResponse = repository.findIdAndTypeByEmailAndSenha(lg.getEmailCliente(), lg.getSenhaCliente());
        return ResponseEntity.ok(loginResponse);
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
