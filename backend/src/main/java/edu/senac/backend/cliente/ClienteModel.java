package edu.senac.backend.cliente;

import edu.senac.backend.service.Criptografia;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Optional;

@ToString
@Table(name = "cliente")
@Entity(name = "Cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ClienteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;
    private String cpfCliente;
    private String datanascCliente;
    private String generoCliente;
    private String telefoneCliente;
    private String emailCliente;
    private String senhaCliente;

    public ClienteModel (ClienteRecordConstructor cliente){

        if (cliente.cliente().id() != null ){

            this.id = cliente.cliente().id();
        }
        this.nomeCliente = cliente.cliente().nomeCliente();
        this.cpfCliente = cliente.cliente().cpfCliente();
        this.datanascCliente = cliente.cliente().dataNascCliente().replace("-", "");
        this.generoCliente = cliente.cliente().generoCliente();
        this.telefoneCliente = cliente.cliente().telefoneCliente();
        this.emailCliente = cliente.cliente().emailCliente();
        this.senhaCliente = new Criptografia().encriptar(cliente.cliente().senhaCliente());
    }

    public ClienteModel(Optional<ClienteModel> clienteModel) {

        if (clienteModel.isPresent()) {
            this.id = clienteModel.get().getId();
            this.nomeCliente = clienteModel.get().getNomeCliente();
            this.cpfCliente = clienteModel.get().getCpfCliente();
            this.datanascCliente = clienteModel.get().getDatanascCliente();
            this.generoCliente = clienteModel.get().getGeneroCliente();
            this.telefoneCliente = clienteModel.get().getTelefoneCliente();
            this.emailCliente = clienteModel.get().getEmailCliente();
            this.senhaCliente = clienteModel.get().getSenhaCliente();
        }
    }

        public ClienteModel(ClienteRecord loginCliente) {
            this.emailCliente = loginCliente.emailCliente();
            this.senhaCliente = new Criptografia().encriptar(loginCliente.senhaCliente());
        }
    }
