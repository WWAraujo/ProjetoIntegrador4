import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../produtos/produtos.service';
import { Router } from '@angular/router';
import { Cliente, ProdutoFotos } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';
import { CarrinhoService } from '../carrinho.services';
import { LoginService } from '../../logins/login.service';

const API = environment.apiURL;

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  productData: ProdutoFotos[] = [];
  imagemPrincipal!: string;
  itensNoCarrinho!: number[];
  idsCount: { [id: number]: number } = {};
  subtotal: number = 0;
  subtotalComFrete: number = 0;
  valorFrete: number = 0;
  logado: boolean = false;
  dadosCliente: Cliente | null = null;
  nomeLogado: string = '';
  freteInserido: boolean = false;

  constructor(
    private service: CarrinhoService,
    private router: Router,
    private serviceProduto: ProdutosService,
    private loginService: LoginService,
    private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.itensNoCarrinho = this.service.getIdsSelecionados();
    this.valorFrete = this.carrinhoService.getValorFrete();
    this.itenNoCarrinho();
  }

  valorDoFreteinserido() {
    if (this.valorFrete > 0 ){
      this.freteInserido = true;
    }
  }

  alterarValorfrete(valor: number) {
    this.valorFrete = valor;
    this.service.setValorFrete(valor);
    this.valorDoFreteinserido();
    this.subtotalCarrinho();
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
            this.subtotalCarrinho();
          });
      }
    }
  }

  aumentarQuantidade(id: number) {
    for (let produto of this.productData) {
      if (produto.produto.id === id) {
        this.idsCount[produto.produto.id]++;
        this.service.adicionarAoCarrinho(produto.produto.id);
      }
    }
    this.subtotalCarrinho();
  }

  diminuirQuantidade(id: number) {
    for (let produto of this.productData) {
      if (produto.produto.id === id) {
        this.idsCount[produto.produto.id]--;
        this.service.removerDoCarrinho(id);
        if (this.idsCount[produto.produto.id] === 0) {
          window.location.reload();
        }
      }
    }
    this.subtotalCarrinho();
  }

  excluirDoCarrinho(id: number) {
    this.service.excluirDoCarrinho(id);
    window.location.reload();
  }

  subtotalCarrinho() {
    this.subtotal = 0;
    for (let produto of this.productData) {
      this.subtotal += (produto.produto.precoProduto * this.idsCount[produto.produto.id]);
      this.subtotalComFrete = this.subtotal + this.valorFrete;
    }
  }

  getFullPath(imageName: string): string {
    return `${API}/api/upload/${imageName}`;
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  paginaPrincipal() {
    this.router.navigate(['telaPrincipal'])
  }


  verificarLogado() {
    if (!this.logado) {
      this.logado = this.verificarClienteLogado();
    }
  }

  verificarClienteLogado() {
    const radioInputs = document.querySelectorAll('.frete .form-check-input');
    let peloMenosUmSelecionado = false;

    for (let i = 0; i < radioInputs.length; i++) {
      const radioInput = radioInputs[i] as HTMLInputElement;
      if (radioInput.checked) {
        peloMenosUmSelecionado = true;
        break;
      }
    }
    this.dadosCliente = this.loginService.getData('clienteData');
    if (this.dadosCliente) {
      if (peloMenosUmSelecionado && this.itensNoCarrinho) {
        this.nomeLogado = this.dadosCliente.nomeCliente;
        this.service.setSubtotal(this.subtotal);
        this.carrinhoService.setTrocarTelaEndereco();
        this.carrinhoService.setLoggedIn(true);
        return true;
      }else{
        alert('Selecione o frete')
      }
    }else{
      this.router.navigate(['/solicitarLogin'], { queryParams: { fromCart: 'true' } })}
    return false;
  }
}
