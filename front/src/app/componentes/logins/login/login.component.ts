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

  constructor(
    private service: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      senha: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    })
  }

  solicitarLogin() {
    console.log(this.formulario.get('email')?.errors);
    if(this.formulario.valid){
      this.service.login(this.formulario.value).subscribe(() => {
        this.router.navigate(['/backoffice'])
      })
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
