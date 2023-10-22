import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, Logado } from 'src/app/core/types/type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  exibirCabecalho: boolean = true;
  usuarioSenhaInvalido: boolean = false;
  selectedType: string = 'cliente';
  clienteLogado!: Cliente;
  // usuarioLogado!:

  constructor(
    private loginService : LoginService,
    private router : Router,
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  fazerLogin(){
    if (this.selectedType === 'usuario'){
      this.LoginColaborador();
    } else if (this.selectedType === 'cliente'){
      this.LoginCliente();
    } else {
      alert('Erro na escolha')
    }
  }

  LoginColaborador() {
    if (this.formulario.valid) {
      this.loginService.loginColaborador(this.formulario.value).subscribe((logado: Logado) => {
        if (logado) {
          // this.usuarioLogado = logado;
          this.loginService.saveData('clienteData', this.clienteLogado);
          this.router.navigate(['/backoffice']);
        } else {
          this.falhaLogin();
        }
      }, (error) => {
        console.error('Falha ao fazer login:', error);
        this.falhaLogin();
      });
    }
  }

  LoginCliente() {
    if (this.formulario.valid) {
      this.loginService.loginCliente(this.formulario.value).subscribe((logado: Cliente) => {
        if (logado) {
          this.clienteLogado = logado;
          this.loginService.saveData('clienteData', this.clienteLogado);
          this.router.navigate(['/alterarCliente']);
        } else {
          this.falhaLogin();
        }
      }, (error) => {
        console.error('Falha ao fazer login:', error);
        this.falhaLogin();
      });
    }
  }

  falhaLogin() {
    this.usuarioSenhaInvalido = true;
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }

  cadastrarCliente() {
    this.router.navigate(['/cadastrarCliente'])
  }
}
