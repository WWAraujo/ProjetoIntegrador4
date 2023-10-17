package edu.senac.backend.controller;

import edu.senac.backend.cliente.*;
import edu.senac.backend.cliente.LoginClienteResponse;
import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteModel;
import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteRecord;
import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @Autowired
    private EnderecosEntregasClienteRepository enderecosEntregasClienteRepository;

    @PostMapping("/cadastrar-cliente")
    public ResponseEntity<Long> cadastrarCliente(@RequestBody ClienteRecordConstructor cliente){

        ClienteModel clienteSalvo = repository.save(new ClienteModel(cliente));

        for (EnderecosEntregasClienteRecord enderecoRecord : cliente.enderecos()){
            EnderecosEntregasClienteModel enderecosEntregasClienteModel =
                    new EnderecosEntregasClienteModel(clienteSalvo, enderecoRecord);
            enderecosEntregasClienteRepository.save(enderecosEntregasClienteModel);
        }

        return ResponseEntity.ok(clienteSalvo.getId());
    }

    @GetMapping("/buscarid/{id}")
    public ResponseEntity<ClienteRecordConstructor> buscarCliente(@PathVariable Long id){

        ClienteModel clienteModel = new ClienteModel(repository.findById(id));

        List<EnderecosEntregasClienteModel> endereco = (enderecosEntregasClienteRepository.findIdByIdCliente(clienteModel.getId()));

        ClienteRecordConstructor cliente = getClienteRecordConstructor(clienteModel, endereco);

        return ResponseEntity.ok(cliente);
    }

    private static ClienteRecordConstructor getClienteRecordConstructor(ClienteModel clienteModel, List<EnderecosEntregasClienteModel> endereco ) {

        ClienteRecord clienteRecord = new ClienteRecord(
                clienteModel.getId(),
                clienteModel.getNomeCliente(),
                clienteModel.getCpfCliente(),
                clienteModel.getDatanascCliente(),
                clienteModel.getGeneroCliente(),
                clienteModel.getTelefoneCliente(),
                clienteModel.getEmailCliente(),
                clienteModel.getSenhaCliente());

        List<EnderecosEntregasClienteRecord> enderecos = new ArrayList<>();

        for (EnderecosEntregasClienteModel end : endereco){
            EnderecosEntregasClienteRecord enderecoAtual = new EnderecosEntregasClienteRecord(
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

        for (EnderecosEntregasClienteRecord enderecoRecord : cliente.enderecos()){
            EnderecosEntregasClienteModel enderecosEntregasClienteModel =
                    new EnderecosEntregasClienteModel(clienteSalvo, enderecoRecord);
            enderecosEntregasClienteRepository.save(enderecosEntregasClienteModel);
        }

        return ResponseEntity.ok(clienteSalvo.getId());

    }

}
