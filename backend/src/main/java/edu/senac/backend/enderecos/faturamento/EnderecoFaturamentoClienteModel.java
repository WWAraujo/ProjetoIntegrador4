package edu.senac.backend.enderecos.faturamento;

import edu.senac.backend.cliente.ClienteModel;
import edu.senac.backend.enderecos.entrega.EnderecosEntregasClienteRecord;
import jakarta.persistence.*;
import lombok.*;

@ToString
@Table(name = "endereco_faturamento")
@Entity(name = "EnderecoFaturamento")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class EnderecoFaturamentoClienteModel {

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

    public EnderecoFaturamentoClienteModel(ClienteModel clienteModel, EnderecosEntregasClienteRecord enderecos){
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
