import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../logins/login.service';
import { Cliente, Logado } from 'src/app/core/types/type';
import { ModalenderecoService } from '../../cliente/modalendereco.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent implements OnInit {
  closeResult: string = '';
  dadosCliente: Cliente | null = null;
  dadosUsuario: Logado | null = null;
  logado: boolean = false;
  nomeLogado: string = '';
  enderecos = null;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private loginService: LoginService,
    private enderecoService: ModalenderecoService
  ) {}

  ngOnInit(): void {
    this.loginService.getLoggedIn().subscribe((loggedIn) => {
      if (loggedIn) {
        // O usuário está logado, atualize a interface de acordo
        this.verificarLogado();
      }
    });
    this.verificarLogado();
  }

  verificarNovoLogin() {
    this.verificarLogado();
  }

  deslogar() {
    this.logado = false;
    if (this.dadosCliente) {
      this.deslogarCliente();
    }
    if (this.dadosUsuario) {
      this.deslogarUsuario();
    }
    this.router.navigate(['/telaPrincipal']);
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

  listarPedidoEstoquista() {
    this.router.navigate(['/alterar-produtos-estoquista']);
  }

  listarPedidoCliente() {
    this.router.navigate(['/listarProdutosCliente']);
  }

  alterarDados() {
    if (this.dadosCliente) {
      this.router.navigate(['/alterarCliente']);
    } else if (this.dadosUsuario) {
      this.router.navigate(['/listarUsuario']);
    }
  }

  verificarLogado() {
    if (!this.logado) {
      this.logado = this.verificarClienteLogado();
    }
    if (!this.logado) {
      this.logado = this.verificarUsuarioLogado();
    }
  }

  verificarClienteLogado() {
    this.dadosCliente = this.loginService.getData('clienteData');
    if (this.dadosCliente) {
      this.nomeLogado = this.dadosCliente.nomeCliente;
      return true;
    }
    return false;
  }

  verificarUsuarioLogado() {
    this.dadosUsuario = this.loginService.getData('usuarioData');
    if (this.dadosUsuario) {
      this.nomeLogado = this.dadosUsuario.nomeUsuario;
      return true;
    }
    return false;
  }

  carrinho() {
    this.router.navigate(['/checkout']);
  }

  deslogarCliente() {
    this.loginService.removeData('clienteData');

    this.dadosCliente = null;
  }

  deslogarUsuario() {
    this.loginService.removeData('usuarioData');
    this.dadosUsuario = null;
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
