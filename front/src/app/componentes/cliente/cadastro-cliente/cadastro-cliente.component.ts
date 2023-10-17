import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Validacoes } from '../../usuario/cadastro-usuario/validacoes';
import { Cliente, Endereco, Genero } from 'src/app/core/types/type';
import { ClienteService } from '../cliente.service';
import { ModalenderecoService } from '../modalendereco.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
})
export class CadastroClienteComponent implements OnInit {
  exibirCabecalho: boolean = true;
  formulario!: FormGroup;
  emailEncontrado: boolean = false;
  senhaCorrespondente: boolean = true;
  genero = Object.values(Genero);
  dataNascimento!: string;
  idCliente!: number;
  clienteData!: Cliente;
  enderecoData: Endereco[] = [];

  cliente: Cliente = {
    id: 0,
    nomeCliente: '',
    cpfCliente: '',
    datanascCliente: '',
    generoCliente: '.',
    telefoneCliente: '',
    emailCliente: '',
    senhaCliente: '',
  };

  constructor(
    private router: Router,
    private service: ClienteService,
    private formBuilder: FormBuilder,
    private serviceEndereco: ModalenderecoService
  ) {}

  ngOnInit(): void {
    this.idCliente = this.service.getIdCliente();
    // this.idCliente = 2; //chumbado um id

    const listaEnderecoAtual = this.serviceEndereco.getListaEndereco();
    if (listaEnderecoAtual) {
      this.enderecoData = listaEnderecoAtual;
    }
    if (this.idCliente) {
      this.service.exibirPerfil(this.idCliente).subscribe((data) => {
        this.clienteData = data.cliente;
        if (!listaEnderecoAtual){
          this.enderecoData = data.enderecos;
        }
      });
    }

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required, Validacoes.ValidaCPF]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      confirmacaoSenha: ['', [Validators.required]],
    });

    const dadosCliente = this.service.getDadosCliente();
    if (dadosCliente) {
      this.formulario.patchValue(dadosCliente);
      this.service.setDadosCliente([]);
    }
  }

  verificaDadosInseridos(){
      if(this.formulario.get('nome')?.value != this.clienteData.nomeCliente ||
      this.formulario.get('genero')?.value != this.clienteData.generoCliente ||
      this.formulario.get('dataNascimento')?.value != this.clienteData.datanascCliente){
        return true;
      }
      return false;
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

  cadastrarCliente() {
    this.cliente = {
      id: this.idCliente,
      nomeCliente: this.formulario.get('nome')?.value,
      cpfCliente: this.formulario.get('cpf')?.value,
      datanascCliente: this.formulario.get('dataNascimento')?.value,
      generoCliente: this.formulario.get('genero')?.value,
      telefoneCliente: this.formulario.get('telefone')?.value,
      emailCliente: this.formulario.get('email')?.value,
      senhaCliente: this.formulario.get('senha')?.value,
    };

    const dadosParaEnviar = {
      cliente: this.cliente,
      enderecos: this.serviceEndereco.getListaEndereco(),
    };

    if (this.idCliente) {
      const verificar = this.verificaDadosInseridos();
      if (verificar){
        this.service
          .alterarCliente(dadosParaEnviar)
          .subscribe((clienteCadastrado) => {
            if (clienteCadastrado) {
              alert('Informações alterada com sucesso');
            } else {
              alert('Algo deu errado no cadastro');
            }
          });
      } else {
        alert('Erro ao alterar.')
      }
    }

    if (!this.emailEncontrado.valueOf() && !this.idCliente) {
      if (!dadosParaEnviar.enderecos){
        this.service
          .cadastrarCliente(dadosParaEnviar)
          .subscribe((clienteCadastrado) => {
            if (clienteCadastrado) {
              this.router.navigate(['/solicitarLogin']);
            } else {
              alert('Algo deu errado no cadastro');
            }
          });
      } else {
        alert('Coloque pelomenos 1 endereço')
      }
    } else {
      if (!this.idCliente){
        alert('Email ja Cadastrado!');
      }
    }

    if (this.formulario.valid && this.senhaCorrespondente) {
    } else {
      alert('Verifique os campos obrigatórios e a confimação de senha');
    }

  }

  addEnderecos() {
    console.log(this.enderecoData);
    const estadoFormularioCliente = this.formulario.getRawValue();
    this.service.setDadosCliente(estadoFormularioCliente);
    this.serviceEndereco.setListaEndereco(this.enderecoData);
    this.router.navigate(['/endereco']);
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
}
