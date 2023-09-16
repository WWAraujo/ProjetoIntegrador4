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
  formulario!: FormGroup;
  logado!: Logado;

  constructor(
    private service: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
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

  solicitarLogin() {
    if (this.formulario.valid) {
      this.service.login(this.formulario.value).subscribe((logado) => {
        this.logado = logado;
        this.userService.setUserType(logado.tipoUsuario);
        this.validarUsuario();
      });
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
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
