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

  constructor() { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      cpf: ['', Validators.compose([
        Validators.required,
        Validators.max(11),
        Validators.min(11)
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
}

export interface User {
  nome: string;
  cpf: string;
  email: string;
  grupo: string; // Pode ser 'ADM' ou 'ESTOQUISTA'
  senha: string;
}


