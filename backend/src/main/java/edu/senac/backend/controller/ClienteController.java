package edu.senac.backend.controller;

import edu.senac.backend.cliente.*;
import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteModel;
import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteRecord;
import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteRepository;
import edu.senac.backend.enderecos.faturamento.EnderecoFaturamentoClienteModel;
import edu.senac.backend.enderecos.faturamento.EnderecoFaturamentoClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private EnderecoFaturamentoClienteRepository faturamentoRepository;

    @PostMapping("/cadastrar-cliente")
    public ResponseEntity<Long> cadastrarCliente(@RequestBody ClienteRecordConstructor cliente){

        ClienteModel clienteSalvo = repository.save(new ClienteModel(cliente));

        for (EnderecosEntregasClienteRecord endereco : cliente.enderecos()){
            if (endereco.enderecoPrincipal().equalsIgnoreCase("P")){
                EnderecoFaturamentoClienteModel faturamento =
                        new EnderecoFaturamentoClienteModel(clienteSalvo, endereco);
                faturamentoRepository.save(faturamento);
            }
        }

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

        List<EnderecosEntregasClienteRecord> enderecos = getEnderecosEntregasClienteRecords(endereco);

        ClienteRecordConstructor cliente = new ClienteRecordConstructor(clienteRecord,enderecos);
        return cliente;
    }

    private static List<EnderecosEntregasClienteRecord> getEnderecosEntregasClienteRecords(List<EnderecosEntregasClienteModel> endereco) {
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
                    end.getUf(),
                    end.getEnderecoPrincipal(),
                    end.getAtivoInativo());
            enderecos.add(enderecoAtual);
        }
        return enderecos;
    }

    @GetMapping("/buscaremail/{email}")
    public Boolean listarCliente(@PathVariable String email) {
        System.out.println("Entrou no busca");
        boolean teste = repository.findByEmailCliente(email).isPresent();
        System.out.println(teste);
        return teste;
    }

    @GetMapping("/buscarcpf/{cpf}")
    public Boolean buscarCPF(@PathVariable String cpf) {
        return repository.findByCpfCliente(cpf).isPresent();
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
