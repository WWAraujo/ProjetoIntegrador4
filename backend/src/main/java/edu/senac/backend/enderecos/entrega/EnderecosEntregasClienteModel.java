package edu.senac.backend.enderecos.entrega;

import edu.senac.backend.cliente.ClienteModel;
import jakarta.persistence.*;
import lombok.*;

@ToString
@Table(name = "enderecos")
@Entity(name = "Enderecos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EnderecosEntregasClienteModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idCliente;
    private String cep;
    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;

    public EnderecosEntregasClienteModel(ClienteModel clienteModel, EnderecosEntregasClienteRecord enderecos){
        this.idCliente = clienteModel.getId();
        this.cep = enderecos.cep();
        this.logradouro = enderecos.logradouro();
        this.numero = enderecos.numero();
        this.complemento = enderecos.complemento();
        this.bairro = enderecos.bairro();
        this.cidade = enderecos.cidade();
        this.uf = enderecos.uf();
    }

    public EnderecosEntregasClienteModel(EnderecosEntregasClienteModel endereco) {
        this.id = endereco.getId();
        this.idCliente = endereco.getIdCliente();
        this.cep = endereco.getCep();
        this.logradouro = endereco.getLogradouro();
        this.numero = endereco.getNumero();
        this.complemento = endereco.getComplemento();
        this.bairro = endereco.getBairro();
        this.cidade = endereco.getCidade();
        this.uf = endereco.getUf();
    }
}
