package edu.senac.backend.cliente;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.autoconfigure.web.WebProperties;

@ToString
@Table(name = "enderecos")
@Entity(name = "Enderecos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EnderecosClienteModel {

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

    public EnderecosClienteModel(ClienteModel clienteModel, EnderecosClienteRecord enderecos){
        this.idCliente = clienteModel.getId();
        this.cep = enderecos.cep();
        this.logradouro = enderecos.logradouro();
        this.numero = enderecos.numero();
        this.complemento = enderecos.complemento();
        this.bairro = enderecos.bairro();
        this.cidade = enderecos.cidade();
        this.uf = enderecos.uf();
    }
}
