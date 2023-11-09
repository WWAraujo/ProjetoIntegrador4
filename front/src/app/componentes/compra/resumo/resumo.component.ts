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
  formaDePagamentoString!: string ;
  exibirFormaDePagamento!: string;
  enderecoSelecionado!: Endereco;
  productData: ProdutoFotos[] = [];
  idsCount: { [id: number]: number } = {};

  dadosVenda: DadosVenda = {
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
    quantidadeCartao: 0,
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
    this.valorFrete = this.carrinhoService.getValorFrete();
    this.enderecoSelecionado = this.carrinhoService.getEndereco();
    this.numeroParcelas = this.carrinhoService.getNumeroParcelas();
    this.itensNoCarrinho = this.carrinhoService.getIdsSelecionados();
    this.formaDePagamentoString = this.carrinhoService.getFormaDePagamento();
    this.dadosCliente = this.loginService.getData('clienteData');
    this.itenNoCarrinho();
    this.subtotalResumo();
    this.calcularValorDaParcela();
    this.verificaFormaDePagamento();
    this.prepararDadosParaEnviarBanckend();

    if (this.enderecoSelecionado == null){
      this.carrinhoService.setTrocarTelaEndereco();
      this.carrinhoService.setLoggedIn(true);
    }

    if (!this.dadosCliente) {
      this.router.navigate(['solicitarLogin'], { queryParams: { fromCart: 'true' } })
    }
    this.carrinhoService.setMostrarResumo(true);
    this.formaPagamento = this.carrinhoService.getFormaPagamentoCompleto();
  }


  finalizarCompra(){
    const mandarVendaProBackend = this.prepararDadosParaEnviarBanckend();
    this.service.salvarVendaBackend(mandarVendaProBackend);

    // this.carrinhoService.setTrocarTelaConcluir();
    // this.carrinhoService.setLoggedIn(true);
  }

  prepararDadosParaEnviarBanckend(){
    this.dadosVenda.idCliente = this.dadosCliente.id;
    this.dadosVenda.nomeCliente = '';
    this.dadosVenda.dataCompra = '';
    this.dadosVenda.prazoEntrega = '';
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

    this.formaPagamento.formaPagamento = this.formaDePagamentoString;
    this.formaPagamento.valorTotal = this.subtotalComFrete;
    this.formaPagamento.nomeCartao = this.formaPagamento.nomeCartao;
    this.formaPagamento.numeroCartao = this.formaPagamento.numeroCartao;
    this.formaPagamento.ccvCartao = this.formaPagamento.ccvCartao;
    this.formaPagamento.validadeCartao = this.formaPagamento.validadeCartao;
    this.formaPagamento.quantidadeCartao = this.formaPagamento.quantidadeCartao;
    this.formaPagamento.valorDaParcela = this.formaPagamento.valorDaParcela;

    this.listaProdutosVenda = this.listaProdutosVenda //Falta colocar os protudos na lista, (pelo menos id)

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

  verificaFormaDePagamento(){
    if(this.formaDePagamentoString === 'cartao'){
      this.exibirFormaDePagamento = 'Cartão de Crédito'
      this.exibirParcelas = true;
    }else if(this.formaDePagamentoString === 'boleto'){
      this.exibirFormaDePagamento = 'Boleto á Vista'
    }else if (this.formaDePagamentoString === 'pix') {
      this.exibirFormaDePagamento = 'Pix á Vista'
    } else{
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

  voltarFormaPagamento(){
    this.carrinhoService.setTrocarTelaFormaPagamento();
    this.carrinhoService.setLoggedIn(true);
  }
}
