import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UsuarioService } from '../../usuario/usuario.service';
import { Validacoes } from '../../usuario/cadastro-usuario/validacoes';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  exibirCabecalho: boolean = true;
  formulario!: FormGroup;
  emailEncontrado: boolean = false;
  senhaCorrespondente: boolean = true;

  constructor(
    private router: Router,
    private service: UsuarioService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      sobrenome: ['',[Validators.required]],
      genero: ['',[Validators.required]],
      cpf: ['', [Validators.required, Validacoes.ValidaCPF]],
      dataNascimento: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      senha: ['', [Validators.required, , Validators.minLength(3)]],
      confirmaSenha: ['', [Validators.required]],
    });

  }
  inputChanged = new Subject<void>();
  onInputChanged() {
    this.inputChanged.next();
  }
  procurarEmail() {
    const email = this.formulario.get('email')?.value;
    this.service.procurarEmail(email).subscribe((emailEncontrado) => {
      this.emailEncontrado = emailEncontrado;
    });
  }
  cadastrarUsuario() {
    if (!this.emailEncontrado.valueOf()) {
      this.service
        .cadastrar(this.formulario.value)
        .subscribe((clienteCadastrado) => {
          if (clienteCadastrado) {
            this.router.navigate(['/listarUsuario']);
          } else {
            alert('Algo deu errado no cadastro');
          }
        });
    } else {
      alert('Email ja Cadastrado!');
    }

    if (this.formulario.valid && this.senhaCorrespondente) {
    } else {
      alert('Verifique os campos obrigatórios e a confimação de senha');
    }
  }

  validarSenha() {
    const senha = this.formulario.get('senha')?.value;
    const confirmacaoSenha = this.formulario.get('confirmacaoSenha')?.value;
    this.senhaCorrespondente = senha === confirmacaoSenha;
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
  Login(){
    this.router.navigate(['/solicitarLogin'])
  }

}
