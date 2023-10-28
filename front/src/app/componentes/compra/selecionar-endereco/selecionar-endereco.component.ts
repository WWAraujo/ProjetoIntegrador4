import { Component, OnInit } from '@angular/core';
import { Cliente, Endereco } from 'src/app/core/types/type';
import { ClienteService } from '../../cliente/cliente.service';
import { ModalenderecoService } from '../../cliente/modalendereco.service';
import { LoginService } from '../../logins/login.service';
import { Router } from '@angular/router';

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

  constructor(
    private serviceCliente: ClienteService,
    private serviceEndereco: ModalenderecoService,
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {

    this.dadosCliente = this.loginService.getData('clienteData');

    if (!this.dadosCliente){
      this.router.navigate(['solicitarLogin'],{ queryParams: { fromCart: 'true' } })
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

  addEndereco(){
    this.serviceCliente.setIdCliente(this.idCliente);
    this.serviceEndereco.setListaEndereco(this.enderecoData);
    this.router.navigate(['endereco'],{ queryParams: { fromCart: 'true' } })
  }

  formaPagamento(){

  }
}
