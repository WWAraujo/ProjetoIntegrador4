package edu.senac.backend.vendas;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table(name = "forma_pagamento")
@Entity(name = "FormaPagamento")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class FormaPagamentoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idPedido;
    private String formaPagamento;
    private Double valorTotal;
    private String nomeCartao;
    private String numeroCartao;
    private String ccvCartao;
    private String validadeCartao;
    private int quantidadeParcelas;
    private Double valorDaParcela;
}
