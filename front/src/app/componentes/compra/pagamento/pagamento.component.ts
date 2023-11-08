import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.services';
import { FormaPagamento } from 'src/app/core/types/type';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  exibir: boolean = false;
  subtotal: number = 0;
  numeroParcelas: number = 1;
  formPagamento: FormaPagamento = {
    formaPagamento: '',
    valorTotal: 0,
    nomeCartao: '',
    numeroCartao: '',
    ccvCartao: '',
    validadeCartao: '',
    quantidadeCartao: 0,
    valorDaParcela: 0
  };

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.exibirDiv;
    this.carrinhoService.setMostrarFormaPagamento(true);
  }

  exibirDiv(event: Event) {
    const target = event.target as HTMLInputElement;
    const divs = document.querySelectorAll('.boleto, .cartao, .pix');

    divs.forEach(div => (div as HTMLElement).style.display = 'none');
    this.carrinhoService.setFormaDePagamento(target.value);

    if (target.checked) {
      const divToShow = document.querySelector(`.${target.value}`);
      if (divToShow) {
        (divToShow as HTMLElement).style.display = 'block';
      }
    }
  }

  finalizarCompra() {

    //passando a forma de pagamento para service do carrinho
    this.carrinhoService.setFormaPagamentoCompleto(this.formPagamento);

    const radioInputs = document.querySelectorAll('.form-check .form-check-input');
    let peloMenosUmSelecionado = false;

    for (let i = 0; i < radioInputs.length; i++) {
      const radioInput = radioInputs[i] as HTMLInputElement;
      if (radioInput.checked) {
        peloMenosUmSelecionado = true;
        break;
      }
    }
    if (peloMenosUmSelecionado) {
      this.carrinhoService.setTrocarTelaConfirmacao();
      this.carrinhoService.setLoggedIn(true);
    } else {
      alert('Selecione uma forma de Pagamento: ');
    }
  }

  voltarEndereco() {
    this.carrinhoService.setTrocarTelaEndereco();
    this.carrinhoService.setLoggedIn(true);
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  calcularValorDaParcela(): number {
    const subtotal = this.carrinhoService.getSubtotal();
    if (this.numeroParcelas > 0) {
      return subtotal / this.numeroParcelas;

    }
    return 0;
  }

  onNumeroParcelasChange(): void {
    this.subtotal = this.calcularValorDaParcela();
    this.carrinhoService.setNumeroParcelas(this.numeroParcelas);
  }

  getOpcoesParcelas(): { value: number, label: string }[] {
    const subtotal = this.carrinhoService.getSubtotal();
    const opcoes: { value: number, label: string }[] = [];

    for (let i = 1; i <= 12; i++) {
      const valorParcela = subtotal / i;
      opcoes.push({
        value: i,
        label: `${i}x sem juros - R$ ${valorParcela.toFixed(2)}`,
      });
    }
    return opcoes;
  }

}
