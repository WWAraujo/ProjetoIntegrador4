import { Component, OnInit } from '@angular/core';
import { Cliente, Endereco } from 'src/app/core/types/type';
import { ClienteService } from '../../cliente/cliente.service';
import { ModalenderecoService } from '../../cliente/modalendereco.service';
import { LoginService } from '../../logins/login.service';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho.services';

@Component({
  selector: 'app-selecionar-endereco',
  templateUrl: './selecionar-endereco.component.html',
  styleUrls: ['./selecionar-endereco.component.css']
})
export class SelecionarEnderecoComponent implements OnInit {

  idCliente!: number;
  dadosCliente!: Cliente;
  enderecoData: Endereco[] = [];
  enderecos: Endereco[] = [];
  enderecoSelecionado: Endereco [] = [];

  constructor(
    private serviceCliente: ClienteService,
    private serviceEndereco: ModalenderecoService,
    private serviceCarrinho: CarrinhoService,
    private loginService: LoginService,
    private router: Router,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit(): void {

    this.dadosCliente = this.loginService.getData('clienteData');

    if (!this.dadosCliente) {
      this.router.navigate(['solicitarLogin'], { queryParams: { fromCart: 'true' } })
    }

    this.idCliente = this.dadosCliente.id;
    const listaEnderecoAtual = this.serviceEndereco.getListaEndereco();

    if (listaEnderecoAtual) {
      this.enderecoData = listaEnderecoAtual;
    }

    if (this.idCliente) {
      this.serviceCliente.exibirPerfil(this.idCliente).subscribe((data) => {
        this.dadosCliente = data.cliente;

        if (listaEnderecoAtual.length < 1) {
          this.enderecoData = data.enderecos;
        }
      });
    }

  }

  selecionarEndereco(endereco: Endereco) {
    this.serviceCarrinho.setEndereco(endereco);
  }

  addEndereco() {
    this.serviceCliente.setIdCliente(this.idCliente);
    this.serviceEndereco.setListaEndereco(this.enderecoData);
    this.router.navigate(['endereco'], { queryParams: { fromCart: 'true' } })
  }

  formaPagamento() {
    const radioInputs = document.querySelectorAll('.container-endereco .form-check-input');
    let peloMenosUmSelecionado = false;

    for (let i = 0; i < radioInputs.length; i++) {
      const radioInput = radioInputs[i] as HTMLInputElement;
      if (radioInput.checked) {
        peloMenosUmSelecionado = true;
        break;
      }
    }

    if(peloMenosUmSelecionado){
      this.carrinhoService.setTrocarTelaFormaPagamento();
      this.carrinhoService.setLoggedIn(true);
    }else{
      alert('Selecione o Endereço da Entrega:');
    }
  }
}
