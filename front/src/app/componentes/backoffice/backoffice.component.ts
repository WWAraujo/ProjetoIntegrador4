import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logado } from '../logins/logado';
import { UserService } from 'src/app/Servicos/user.services';
@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {

  logado!: Logado

  isAdmin: boolean = false;
  isEstoquista: boolean = false;
  isCliente: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

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
    this.router.navigate(['listarUsuario'])
  }

}

