import { Logado } from './../logado';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  logado!: Logado

  constructor(
    private service: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      senha: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])]
    })
  }

  solicitarLogin() {
    if(this.formulario.valid){
      this.service.login(this.formulario.value).subscribe((logado) => {
        console.log(logado)
        this.validarUsuario()
      })
    }
  }


  validarUsuario(){
    if (this.logado) {
      this.router.navigate(['/backoffice'])
    } else {
      alert("Não foi possivel fazer o login")
    }
  }

  habilitarBotao(): string {
    if(this.formulario.valid){
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
