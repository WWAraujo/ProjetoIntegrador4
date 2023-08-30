import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  user: User = {
    nome: '',
    cpf: '',
    email: '',
    grupo: 'ADMINISTRADOR',
    senha: ''
  };

  formulario!: FormGroup;
  formBuilder!: FormBuilder;

  constructor() { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      cpf: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        this.validarCpf
      ])],
      senha: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])]
    })
  }

  confirmarSenha: string = '';

  cadastrarUsuario() {

    if (this.user.email === 'email@existente.com') {
      alert('Este e-mail já está cadastrado. Escolha outro.');
    } else {
      console.log('Usuário cadastrado com sucesso:', this.user);
    }
  }

  validarCpf(control: { value: string }): { [key: string]: any } | null {
    const cpf = control.value.replace(/\D/g, ''); // Remove non-digit characters

    if (cpf.length !== 11) {
      return { 'invalidCpf': true }; // Return an error if CPF length is not 11
    }

    // Check for repeated digits
    if (/^(\d)\1+$/.test(cpf)) {
      return { 'invalidCpf': true };
    }

    // Validate CPF algorithm
    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return { 'invalidCpf': true };
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return { 'invalidCpf': true };
    }

    return null; // CPF is valid
  }

  cpfInvalido: boolean = false;
}

export interface User {
  nome: string;
  cpf: string;
  email: string;
  grupo: string; // Pode ser 'ADM' ou 'ESTOQUISTA'
  senha: string;
}


