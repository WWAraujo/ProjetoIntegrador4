package edu.senac.backend.cliente;

import edu.senac.backend.service.Criptografia;
import lombok.ToString;

import java.util.Optional;

@ToString
public class PrepararClienteParaAlterar {

    private Long id;
    private String nomeCliente;
    private String cpfCliente;
    private String datanascCliente;
    private String generoCliente;
    private String telefoneCliente;
    private String emailCliente;
    private String senhaCliente;

    public PrepararClienteParaAlterar(Optional<ClienteModel> clienteModel) {

        if (clienteModel.isPresent()) {
            this.id = clienteModel.get().getId();
            this.nomeCliente = clienteModel.get().getNomeCliente();
            this.cpfCliente = clienteModel.get().getCpfCliente();
            this.emailCliente = clienteModel.get().getEmailCliente();
            this.senhaCliente = new Criptografia().descriptar(clienteModel.get().getSenhaCliente());
            this.datanascCliente = clienteModel.get().getDatanascCliente();
            this.generoCliente = clienteModel.get().getGeneroCliente();
            this.telefoneCliente = clienteModel.get().getTelefoneCliente();
        }
    }
}
