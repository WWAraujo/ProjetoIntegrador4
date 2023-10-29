import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.services';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  telaParaExibir: string = 'carrinho';

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.carrinhoService.getLoggedIn().subscribe((loggedIn) => {
      if (loggedIn) {
        // Verificar tela
        this.verificarTela();
      }
    });
  }

  verificarTela(){
    this.telaParaExibir = this.carrinhoService.getTelaCarrinho();
  }

  trocarTelaCarrinho() {
    this.carrinhoService.setTrocarTelaCarrinho();
    this.carrinhoService.setLoggedIn(true);
  }

  trocarTelaEndereco() {
    this.carrinhoService.setTrocarTelaEndereco();
    this.carrinhoService.setLoggedIn(true);
  }

  trocarTelaFormaPagamento() {
    this.carrinhoService.setTrocarTelaFormaPagamento();
    this.carrinhoService.setLoggedIn(true);
  }

  trocarTelaConfirmacao() {
    this.carrinhoService.setTrocarTelaConfirmacao();
    this.carrinhoService.setLoggedIn(true);
  }

  trocarTelaConcluir() {
    this.carrinhoService.setTrocarTelaConcluir();
    this.carrinhoService.setLoggedIn(true);
  }

}
