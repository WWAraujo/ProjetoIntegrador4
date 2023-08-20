import { Login } from './../login';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    usuario: '',
    senha: ''
  }

  constructor(
    private service: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  solicitarLogin() {
    this.service.solicitarLogin(this.login).subscribe(() => {
      this.router.navigate(['/home'])
    })
  }

}
