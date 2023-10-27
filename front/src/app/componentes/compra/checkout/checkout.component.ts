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

  exibirCabecalho: boolean = true;
  emailEncontrado: boolean = false;
  cpfEncontrado: boolean = false;
  senhaCorrespondente: boolean = false;
  idCliente!: number;
  dadosCliente!: Cliente;
  enderecoData: Endereco[] = [];
  enderecos: Endereco[] = [];

  constructor(
    private serviceCliente: ClienteService,
    private serviceEndereco: ModalenderecoService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {

    this.dadosCliente = this.loginService.getData('clienteData');
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
}
