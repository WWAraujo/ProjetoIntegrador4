import { DadosVenda, FormaPagamento, ProdutosVenda } from './../../../core/types/type';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.services';
import { ProdutosService } from '../../produtos/produtos.service';
import { Endereco, ProdutoFotos } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const API = environment.apiURL;

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.component.html',
  styleUrls: ['./resumo.component.css']
})
export class ResumoComponent implements OnInit {

  subtotal: number = 0;
  subtotalComFrete: number = 0;
  numeroParcelas: number = 1;
  itensNoCarrinho!: number[];
  idsCount: { [id: number]: number } = {};
  productData: ProdutoFotos[] = [];
  totalProdutoSomado: number = 0;
  valorFrete!: number;
  tipoDaEntrega!: string;
  formaDePagamento!: string ;
  exibirParcelas: boolean = false;
  exibirFormaDePagamento!: String;
  subtotalParcelado: number = 0;
  enderecoSelecionado: Endereco | null = null;
  enderecoData: Endereco | null = null;

  dadosVenda!: DadosVenda;
  formaPagamento!: FormaPagamento;
  listaProdutosVenda!: ProdutosVenda[];

  constructor(
    private service: CarrinhoService,
    private serviceProduto: ProdutosService,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.itensNoCarrinho = this.service.getIdsSelecionados();
    this.numeroParcelas = this.service.getNumeroParcelas();
    this.valorFrete = this.service.getValorFrete();
    this.formaDePagamento = this.service.getFormaDePagamento();
    this.enderecoSelecionado = this.service.getEndereco();
    this.calcularValorDaParcela();
    this.verificaFormaDePagamento();
    this.itenNoCarrinho();
    this.subtotalResumo();

    if (this.enderecoSelecionado == null){
      this.carrinhoService.setTrocarTelaEndereco();
      this.carrinhoService.setLoggedIn(true);
    }
  }


  finalizarCompra(){
    const mandarVendaProBackend = this.prepararDadosParaEnviar(); //falta preencher os dados para mandar pro back
    // this.carrinhoService.setTrocarTelaConcluir();
    // this.carrinhoService.setLoggedIn(true);
  }

  prepararDadosParaEnviar(){

    this.dadosVenda.idCliente = 0;
    this.dadosVenda.nomeCliente = '';
    this.dadosVenda.dataCompra = '';
    this.dadosVenda.prazoEntrega = '';
    this.dadosVenda.valorEntrega = 0;
    this.dadosVenda.valorTotal = 0;
    this.dadosVenda.statusEntrega = '';
    this.dadosVenda.formaPagamento = '';
    this.dadosVenda.qtdParcelas = 0;
    this.dadosVenda.cep = '';
    this.dadosVenda.logradouro = '';
    this.dadosVenda.numero = '';
    this.dadosVenda.complemento = '';
    this.dadosVenda.bairro = '';
    this.dadosVenda.cidade = '';
    this.dadosVenda.uf = '';

    this.formaPagamento.formaPagamento
    this.formaPagamento.valorTotal
    this.formaPagamento.nomeCartao
    this.formaPagamento.numeroCartao
    this.formaPagamento.ccvCartao
    this.formaPagamento.validadeCartao
    this.formaPagamento.quantidadeCartao
    this.formaPagamento.valorDaParcela

    this.listaProdutosVenda

    const dadosParaEnviar = {
      dadosVenda: this.dadosVenda,
      formaPagamento: this.formaPagamento,
      produtos: this.listaProdutosVenda
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
    this.numeroParcelas = this.service.getNumeroParcelas();
    this.subtotalParcelado = 0;
    const subtotal = this.service.getSubtotal();
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
    if(this.formaDePagamento === 'cartao'){
      this.exibirFormaDePagamento = 'Cartão de Crédito'
      this.exibirParcelas = true;
    }else if(this.formaDePagamento === 'boleto'){
      this.exibirFormaDePagamento = 'Boleto á Vista'
    }else if (this.formaDePagamento === 'pix') {
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
