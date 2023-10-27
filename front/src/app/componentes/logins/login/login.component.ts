import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, Logado } from 'src/app/core/types/type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  usuarioSenhaInvalido: boolean = false;
  selectedType: string = 'cliente';
  clienteLogado!: Cliente;
  usuarioLogado!: Logado;

  constructor(
    private loginService : LoginService,
    private router : Router,
    private formBuilder : FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.route.queryParams.subscribe((params) => {
      if (params['fromCart'] === 'true') {
      }
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
          this.usuarioLogado = logado;
          this.loginService.saveData('usuarioData', this.usuarioLogado);
          this.loginService.setLoggedIn(true);
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
          this.loginService.setLoggedIn(true);
          this.route.queryParams.subscribe((params) => {
            if (params['fromCart'] === 'true') {
              this.router.navigate(['/checkout']);
            } else {
              this.router.navigate(['/telaPrincipal']);
            }
          });
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
