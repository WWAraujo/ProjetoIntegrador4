import { Component, OnInit } from '@angular/core';

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
    grupo: 'ADM',
    senha: ''
  };

  constructor() { }

  ngOnInit(): void {
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


