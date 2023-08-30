import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { TipoUsuario } from './user-role.enum';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})

export class CadastroUsuarioComponent implements OnInit {
  formulario!: FormGroup;
  cpfInvalido: boolean = false;
  tiposUsuario  = Object.values(TipoUsuario);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: UsuarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: '',
      cpf: '',
      email: '',
      tipoUsuario: [''],
      senha: ''

      // nome: ["", Validators.min(3)],
      // cpf: ['', Validators.compose([
      //   Validators.required,
      //   Validators.maxLength(11),
      //   Validators.minLength(11),
      //   this.validarCpf
      // ])],
      // senha: ['', Validators.compose([
      //   Validators.required,
      //   Validators.minLength(3)
      // ])]
    })
  }

  cadastrarUsuario() {
    this.service.cadastrar(this.formulario.value).subscribe(); { }

    console.log("componente ts passando formulario", this.formulario.value)
    // if (this.user.email === 'email@existente.com') {
    //   alert('Este e-mail já está cadastrado. Escolha outro.');
    // } else {
    //   console.log('Usuário cadastrado com sucesso:', this.user);
    // }
  }

  // habilitarBotao(): string {
  //   if(this.formulario.valid){
  //     return 'botao'
  //   } else {
  //     return 'botao__desabilitado'
  //   }
  // }

  // validarCpf(control: { value: string }): { [key: string]: any } | null {
  //   const cpf = control.value.replace(/\D/g, ''); // Remove non-digit characters

  //   if (cpf.length !== 11) {
  //     return { 'invalidCpf': true }; // Return an error if CPF length is not 11
  //   }

  //   // Check for repeated digits
  //   if (/^(\d)\1+$/.test(cpf)) {
  //     return { 'invalidCpf': true };
  //   }

  //   // Validate CPF algorithm
  //   let sum = 0;
  //   let remainder: number;

  //   for (let i = 1; i <= 9; i++) {
  //     sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  //   }

  //   remainder = (sum * 10) % 11;

  //   if ((remainder === 10) || (remainder === 11)) {
  //     remainder = 0;
  //   }

  //   if (remainder !== parseInt(cpf.substring(9, 10))) {
  //     return { 'invalidCpf': true };
  //   }

  //   sum = 0;
  //   for (let i = 1; i <= 10; i++) {
  //     sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  //   }

  //   remainder = (sum * 10) % 11;

  //   if ((remainder === 10) || (remainder === 11)) {
  //     remainder = 0;
  //   }

  //   if (remainder !== parseInt(cpf.substring(10, 11))) {
  //     return { 'invalidCpf': true };
  //   }

  //   return null; // CPF is valid
  // }
}
