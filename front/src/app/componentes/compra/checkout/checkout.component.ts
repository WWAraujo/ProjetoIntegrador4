import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.services';
import { Subscription } from 'rxjs';
import { LoginService } from '../../logins/login.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  telaParaExibir: string = 'carrinho';
  valorFrete: number = 0;
  clienteLogado: boolean = true;

  constructor(
    private carrinhoService: CarrinhoService,
    private loginService: LoginService
    ) {
   }

  ngOnInit(): void {
    this.carrinhoService.getLoggedIn().subscribe((loggedIn) => {
      if (loggedIn) {
        this.verificarTela();
      }
    });
    this.verificarClenteLogado();
  }

  verificarClenteLogado(){
    const cliente = this.loginService.getData('clienteData');
    if (cliente){
      this.clienteLogado = false;
    }
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
