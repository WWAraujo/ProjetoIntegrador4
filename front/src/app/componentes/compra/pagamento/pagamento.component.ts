import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.services';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  exibir: boolean = false;
  subtotal: number = 0;
  numeroParcelas: number = 1;

  constructor(
    private router: Router,
    private service: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.exibirDiv;
  }

  exibirDiv(event: Event) {
    const target = event.target as HTMLInputElement;
    const divs = document.querySelectorAll('.boleto, .cartao, .pix');

    divs.forEach(div => (div as HTMLElement).style.display = 'none');
    this.service.setFormaDePagamento(target.value);

    if (target.checked) {
      const divToShow = document.querySelector(`.${target.value}`);
      if (divToShow) {
        (divToShow as HTMLElement).style.display = 'block';
      }
    }
  }

  selecionado() {
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
      this.router.navigate(['resumo'])
    } else {
      alert('Selecione uma forma de Pagamento: ');
    }
  }

  voltarEndereco() {
    this.router.navigate(['/selecionarEndereco']);
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  calcularValorDaParcela(): number {
    const subtotal = this.service.getSubtotal();
    if (this.numeroParcelas > 0) {
      return subtotal / this.numeroParcelas;

    }
    return 0;
  }

  onNumeroParcelasChange(): void {
    this.subtotal = this.calcularValorDaParcela();
    this.service.setNumeroParcelas(this.numeroParcelas);
  }

  getOpcoesParcelas(): { value: number, label: string }[] {
    const subtotal = this.service.getSubtotal();
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
