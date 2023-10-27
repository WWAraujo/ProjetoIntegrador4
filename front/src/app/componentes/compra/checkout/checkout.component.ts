import { Component, OnInit } from '@angular/core';
import { Cliente, Endereco } from 'src/app/core/types/type';
import { ModalenderecoService } from '../../cliente/modalendereco.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../cliente/cliente.service';
import { LoginService } from '../../logins/login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  emailEncontrado: boolean = false;
  cpfEncontrado: boolean = false;
  senhaCorrespondente: boolean = false;
  idCliente!: number;
  dadosCliente!: Cliente;
  telaParaExibir: string = 'carrinho';

  constructor(
    private serviceCliente: ClienteService,
    private serviceEndereco: ModalenderecoService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  trocarTelaCarrinho(){
    this.telaParaExibir = 'carrinho';
  }

  trocarTelaEndereco(){
    this.telaParaExibir = 'endereco';
  }

  trocarTelaFormaPagamento(){
    this.telaParaExibir = 'pagamento';
  }

  trocarTelaConfirmacao(){
    this.telaParaExibir = 'confirmacao';
  }

  trocarTelaConcluir(){
    this.telaParaExibir = 'concluir';
  }

}
