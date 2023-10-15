import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../usuario/user.services';
import { Logado } from 'src/app/core/types/type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formularioCliente!: FormGroup;
  formularioColaborador!: FormGroup;
  logado!: Logado;
  exibirCabecalho: boolean = true;
  usuarioLogado: boolean = true;
  usuarioSenhaInvalido: boolean = false;
  selectedType: string = 'usuario';

  constructor(
    private service: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.userService.setUsuarioLogado(!this.usuarioLogado);
    this.formularioColaborador = this.formBuilder.group({
      usuario: [
        '',
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      senha: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
    this.formularioCliente = this.formBuilder.group({
      usuario: [
        '',
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      senha: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
    });
  }

  LoginColaborador() {
    if (this.formularioColaborador.valid) {
      this.service.loginColaborador(this.formularioColaborador.value).subscribe((logado) => {
        if (logado){
          this.logado = logado;
          this.userService.setUserType(logado.tipoUsuario);
          this.userService.setUsuarioLogado(this.usuarioLogado);
          this.validarUsuario();
          console.log(logado);
        } else {
          this.usuarioSenhaInvalido = true;
        }
      });
    }
  }

  LoginCliente() {
    if (this.formularioCliente.valid) {

        } else {

        }
    }


  validarUsuario() {
    if (this.logado.tipoUsuario === '1') {
      this.router.navigate(['/backoffice']);
    } else if (this.logado.tipoUsuario === '2') {
      this.router.navigate(['/backoffice']);
    }
  }

  habilitarBotao(): string {
    if (this.formularioColaborador.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
  cadastrarCliente(){
    this.router.navigate(['/cadastrarCliente'])
  }
}
