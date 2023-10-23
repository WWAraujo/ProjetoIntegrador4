import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../../cliente/cliente.services';
import { LoginService } from '../../logins/login.service';
import { Cliente } from 'src/app/core/types/type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
  closeResult: string = '';
  logado: boolean = false;
  dadosCliente: Cliente | null = null;
  nomeLogado: string = '';

  constructor(
    private router: Router,
    private clientService: ClientService,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.verificarLogado();
  }

  deslogar() {
    this.logado = false;
    this.deslogarCliente();
  }

  Login() {
    this.router.navigate(['/solicitarLogin']);
  }

  registrar() {
    this.router.navigate(['/cadastrarCliente']);
  }

  telaPrincipal() {
    this.router.navigate(['/cadastroCliente']);
  }

  alterarDados() {
    this.router.navigate(['/alterarCliente']);
  }

  verificarLogado() {
    if (!this.logado){
      this.logado = this.verificarClienteLogado();
    }
  }

  verificarClienteLogado() {
    this.dadosCliente = this.loginService.getData('clienteData');
    if(this.dadosCliente){
      this.nomeLogado = this.dadosCliente.nomeCliente;
      return true;
    }
    return false;
  }

  carrinho(){
    this.router.navigate(['carrinho']);
  }

  deslogarCliente(){
    this.loginService.removeData('clienteData');
    this.dadosCliente = null;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getPrimeiroNome() {
    const nomeCompletoArray = this.nomeLogado.split(' ');
    if (nomeCompletoArray.length > 0) {
      return nomeCompletoArray[0];
    }
    return 'Nome não encontrado';
  }
}
