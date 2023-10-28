package edu.senac.backend.vendas;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table(name = "dados_pedidos")
@Entity(name = "Pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class DadosPedidoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idCliente;
    private String nomeCliente;
    private String dataCompra;
    private String prazoEntrega;
    private Double valorEntrega;
    private Double valorTotal;
    private String formaPagamento;
    private int qtdParcelas;
    private String cep;
    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;

    public DadosPedidoModel(DadosPedidoRecord dadosPedidoRecord) {
        this.id = dadosPedidoRecord.id();
        this.idCliente = dadosPedidoRecord.idCliente();
        this.nomeCliente = dadosPedidoRecord.nomeCliente();
        this.dataCompra = dadosPedidoRecord.dataCompra();
        this.prazoEntrega = dadosPedidoRecord.prazoEntrega();
        this.valorEntrega = dadosPedidoRecord.valorEntrega();
        this.valorTotal = dadosPedidoRecord.valorTotal();
        this.formaPagamento = dadosPedidoRecord.formaPagamento();
        this.cep = dadosPedidoRecord.cep();
        this.logradouro = dadosPedidoRecord.logradouro();
        this.numero = dadosPedidoRecord.numero();
        this.complemento = dadosPedidoRecord.complemento();
        this.bairro = dadosPedidoRecord.bairro();
        this.cidade = dadosPedidoRecord.cidade();
        this.uf = dadosPedidoRecord.uf();
    }
}
