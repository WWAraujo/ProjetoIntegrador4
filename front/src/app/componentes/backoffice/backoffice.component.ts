import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/componentes/usuario/user.services';
import { Logado } from 'src/app/core/types/type';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css'],
})
export class BackofficeComponent implements OnInit {
  logado!: Logado;
  isAdmin: boolean = false;
  isEstoquista: boolean = false;
  isCliente: boolean = false;
  exibirCabecalho: boolean = true;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const userType = this.userService.getUserType();
    if (userType === '1') {
      this.isAdmin = true;
    } else if (userType === '2') {
      this.isEstoquista = true;
    } else if (userType === '3') {
      this.isCliente = true;
    }
  }
  irParaUsuarios() {
    this.router.navigate(['listarUsuario']);
  }

  irParaListaProdutos() {
    this.router.navigate(['listarProduto']);
  }
}
