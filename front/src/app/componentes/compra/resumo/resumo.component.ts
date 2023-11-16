import { Cliente, DadosVenda, FormaPagamento, ProdutosVenda, Venda } from './../../../core/types/type';
import { Component, OnInit } from '@angular/core';
import { CarrinhoServices } from '../carrinho.services';
import { ProdutosService } from '../../produtos/produtos.service';
import { Endereco, ProdutoFotos } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../../logins/login.service';
import { CarrinhoService } from '../carrinho.service';

const API = environment.apiURL;

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent implements OnInit {

  subtotal: number = 0;
  valorFrete!: number;
  subtotalComFrete: number = 0;
  numeroParcelas: number = 1;
  subtotalParcelado: number = 0;
  exibirParcelas: boolean = false;
  itensNoCarrinho!: number[];
  dadosCliente!: Cliente;
  tipoDaEntrega!: string;
  formaDePagamentoString!: string;
  exibirFormaDePagamento!: string;
  enderecoSelecionado!: Endereco;
  productData: ProdutoFotos[] = [];
  idsCount: { [id: number]: number } = {};
  idVenda!: number;
  tempoDeEntrega!: string;
  dataCompraString!: string;

  dadosVenda: DadosVenda = {
    id: 0,
    idCliente: 0,
    nomeCliente: '',
    dataCompra: '',
    prazoEntrega: '',
    valorEntrega: 0,
    valorTotal: 0,
    statusEntrega: '',
    formaPagamento: '',
    qtdParcelas: 0,
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: ''
  };

  formaPagamento: FormaPagamento = {
    formaPagamento: '',
    valorTotal: 0,
    nomeCartao: '',
    numeroCartao: '',
    ccvCartao: '',
    validadeCartao: '',
    quantidadeParcelas: 0,
    valorDaParcela: 0
  };

  listaProdutosVenda: ProdutosVenda[] = [];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private serviceProduto: ProdutosService,
    private carrinhoService: CarrinhoServices,
    private service: CarrinhoService
  ) { }

  ngOnInit(): void {

    this.carrinhoService.setMostrarResumo(true);
    this.valorFrete = this.carrinhoService.getValorFrete();
    this.enderecoSelecionado = this.carrinhoService.getEndereco();
    this.numeroParcelas = this.carrinhoService.getNumeroParcelas();
    this.itensNoCarrinho = this.carrinhoService.getIdsSelecionados();
    this.formaDePagamentoString = this.carrinhoService.getFormaDePagamento();
    this.formaPagamento = this.carrinhoService.getFormaPagamentoCompleto();
    this.dadosCliente = this.loginService.getData('clienteData');

    this.itenNoCarrinho();
    this.subtotalResumo();
    this.calcularValorDaParcela();
    this.verificaFormaDePagamento();
    this.informarTempoDeEntrega();

    if (this.enderecoSelecionado == null) {
      this.carrinhoService.setTrocarTelaEndereco();
      this.carrinhoService.setLoggedIn(true);
    }

    if (!this.dadosCliente) {
      this.router.navigate(['solicitarLogin'], { queryParams: { fromCart: 'true' } })
    }

    const dataHoraLocal = new Date();

    const formatoDataHora: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

    this.dataCompraString = dataHoraLocal.toLocaleString('pt-BR', formatoDataHora);
  }


  finalizarCompra() {

    const dadosParaEnviar = this.DadosParaEnviar();


    if (!this.idVenda) {
      this.service.cadastrarVenda(dadosParaEnviar).subscribe(
        (response) => {
          this.carrinhoService.setIdVendaSalvaBanco(response);
          alert('Produto salvo com sucesso!');
          this.carrinhoService.setTrocarTelaConcluir();
          this.carrinhoService.setLoggedIn(true);
        },
        (error) => {
          alert('Algo deu errado!')
        }
      );
    }
  }

  DadosParaEnviar() {
    this.dadosVenda.idCliente = this.dadosCliente.id;
    this.dadosVenda.nomeCliente = this.dadosCliente.nomeCliente;
    this.dadosVenda.prazoEntrega = this.tempoDeEntrega;
    this.dadosVenda.valorEntrega = this.valorFrete;
    this.dadosVenda.valorTotal = this.subtotalComFrete;
    this.dadosVenda.statusEntrega = 'AGUARDANDO PAGAMENTO';
    this.dadosVenda.formaPagamento = this.exibirFormaDePagamento;
    this.dadosVenda.qtdParcelas = this.numeroParcelas;
    this.dadosVenda.cep = this.enderecoSelecionado?.cep;
    this.dadosVenda.logradouro = this.enderecoSelecionado?.logradouro;
    this.dadosVenda.numero = this.enderecoSelecionado?.numero;
    this.dadosVenda.complemento = this.enderecoSelecionado?.complemento;
    this.dadosVenda.bairro = this.enderecoSelecionado?.bairro;
    this.dadosVenda.cidade = this.enderecoSelecionado?.cidade;
    this.dadosVenda.uf = this.enderecoSelecionado?.uf;


    this.dadosVenda.dataCompra = this.dataCompraString;

    this.formaPagamento.formaPagamento = this.formaDePagamentoString;
    this.formaPagamento.valorTotal = this.subtotalComFrete;
    this.formaPagamento.nomeCartao = this.formaPagamento.nomeCartao;
    this.formaPagamento.numeroCartao = this.formaPagamento.numeroCartao;
    this.formaPagamento.ccvCartao = this.formaPagamento.ccvCartao;
    this.formaPagamento.validadeCartao = this.formaPagamento.validadeCartao;
    this.formaPagamento.quantidadeParcelas = this.numeroParcelas;
    this.formaPagamento.valorDaParcela = this.subtotalParcelado;

    this.listaProdutosVenda = this.itensNoCarrinho.map((id: number) => {
      const produto = this.productData.find((p) => p.produto.id === id);
      const quantidade = this.idsCount[id];
      return {
        idPedido: 0,
        valorUnidade: produto?.produto.precoProduto || 0,
        idProduto: id,
        quantidade: quantidade,
      };
    });

    const dadosParaEnviar = {
      dadosVenda: this.dadosVenda,
      formaPagamento: this.formaPagamento,
      produtos: this.listaProdutosVenda,
    };

    return dadosParaEnviar;
  }

  calcularTotalProduto(produto: any): number {
    const precoProduto = produto.produto.precoProduto;
    const quantidade = this.idsCount[produto.produto.id];
    if (quantidade) {
      const total = quantidade * precoProduto;
      return total;
    }
    return 0;
  }

  calcularValorDaParcela(): number {
    this.numeroParcelas = this.carrinhoService.getNumeroParcelas();
    this.subtotalParcelado = 0;
    const subtotal = this.carrinhoService.getSubtotal();
    if (this.numeroParcelas > 0) {
      this.subtotalParcelado = subtotal / this.numeroParcelas;
      return this.subtotalParcelado;
    }
    return 0;
  }

  itenNoCarrinho() {
    for (let i = 0; i < this.itensNoCarrinho.length; i++) {
      const id = this.itensNoCarrinho[i];
      if (this.idsCount[id]) {
        this.idsCount[id]++;
      } else {
        this.idsCount[id] = 1;
        this.serviceProduto.getProdutoCompleto(id)
          .subscribe((data) => {
            this.productData.push(data);
            this.subtotalResumo();
          });
      }
    }
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  getFullPath(imageName: string): string {
    return `${API}/api/upload/${imageName}`;
  }

  verificaFormaDePagamento() {
    if (this.formaDePagamentoString === 'cartao') {
      this.exibirFormaDePagamento = 'Cartão de Crédito'
      this.exibirParcelas = true;
    } else if (this.formaDePagamentoString === 'boleto') {
      this.exibirFormaDePagamento = 'Boleto Á Vista'
    } else if (this.formaDePagamentoString === 'pix') {
      this.exibirFormaDePagamento = 'Pix Á Vista'
    } else {
      this.carrinhoService.setTrocarTelaFormaPagamento();
      this.carrinhoService.setLoggedIn(true);
    }
  }

  subtotalResumo() {
    this.subtotal = 0;
    for (let produto of this.productData) {
      const precoProduto = produto.produto.precoProduto;
      const quantidade = this.idsCount[produto.produto.id];
      const frete = this.valorFrete;
      if (quantidade) {
        this.subtotal += precoProduto * quantidade;
        this.subtotalComFrete = this.subtotal + frete;
      }
    }
  }

  voltarFormaPagamento() {
    this.carrinhoService.setTrocarTelaFormaPagamento();
    this.carrinhoService.setLoggedIn(true);
  }

  informarTempoDeEntrega() {

    if (this.valorFrete === 15) {
      this.tempoDeEntrega = "1 a 3 Dias Úteis"
    } else if (this.valorFrete === 10) {
      this.tempoDeEntrega = "3 a 5 Dias Úteis"
    } else if (this.valorFrete === 5) {
      this.tempoDeEntrega = "5 a 10 Dias Úteis"
    }
    return this.tempoDeEntrega;
  }

}
