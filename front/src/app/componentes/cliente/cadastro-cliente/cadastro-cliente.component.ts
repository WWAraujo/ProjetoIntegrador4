import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Validacoes } from '../../usuario/cadastro-usuario/validacoes';
import { Cliente, Endereco, Genero } from 'src/app/core/types/type';
import { ClienteService } from '../cliente.service';
import { ModalenderecoService } from '../modalendereco.service';
import { nomeClienteValidator } from '../validadorCliente';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
})
export class CadastroClienteComponent implements OnInit {
  exibirCabecalho: boolean = true;
  formulario!: FormGroup;
  emailEncontrado: boolean = false;
  cpfEncontrado: boolean = false;
  senhaCorrespondente: boolean = true;
  genero = Object.values(Genero);
  dataNascimento!: string;
  idCliente!: number;
  private dadosCliente!: Cliente;
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
    confirmacaoSenha: '',
  };

  constructor(
    private router: Router,
    private service: ClienteService,
    private formBuilder: FormBuilder,
    private serviceEndereco: ModalenderecoService
  ) {}

  ngOnInit(): void {
    this.idCliente = this.service.getIdCliente();
    // this.idCliente = 1; //chumbado um id

    const listaEnderecoAtual = this.serviceEndereco.getListaEndereco();
    if (listaEnderecoAtual) {
      this.enderecoData = listaEnderecoAtual;
    }

    if (this.idCliente) {
      this.service.exibirPerfil(this.idCliente).subscribe((data) => {
        this.cliente = data.cliente;
        this.dadosCliente = data.cliente;
        if (listaEnderecoAtual.length < 1) {
          this.enderecoData = data.enderecos;
        }
      });
    }

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, nomeClienteValidator()]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.pattern(/^[0-9]{0,11}$/)]],
      email: [
        '',
        [
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
    }
  }

  verificaDadosInseridos() {
    if (
      this.cliente.nomeCliente != this.dadosCliente.nomeCliente ||
      this.cliente.generoCliente != this.dadosCliente.generoCliente ||
      this.cliente.datanascCliente != this.dadosCliente.datanascCliente
    ) {
      return true;
    }
    console.log('cliente', this.cliente);
    console.log('cliente Data', this.dadosCliente);
    return false;
  }

  inputChanged = new Subject<void>();

  onInputChanged() {
    this.inputChanged.next();
  }

  procurarEmail() {
    this.service
      .procurarEmail(this.cliente.emailCliente)
      .subscribe((response) => {
        this.emailEncontrado = response;
      });
  }

  procurarCpf() {
    this.service.procurarCPF(this.cliente.cpfCliente).subscribe((response) => {
      this.cpfEncontrado = response;
    });
  }

  cadastrarCliente() {

    this.cliente = {
      id: 0,
      nomeCliente: this.formulario.get('nome')?.value,
      cpfCliente: this.formulario.get('cpf')?.value,
      datanascCliente: this.formulario.get('dataNascimento')?.value,
      generoCliente: this.formulario.get('genero')?.value,
      telefoneCliente: this.formulario.get('telefone')?.value,
      emailCliente: this.formulario.get('email')?.value,
      senhaCliente: this.formulario.get('senha')?.value,
      confirmacaoSenha: this.formulario.get('senha')?.value,
    };

    const dadosParaEnviar = {
      cliente: this.cliente,
      enderecos: this.enderecoData,
    };
    console.log('Dados enviados', dadosParaEnviar);

    if (!this.emailEncontrado.valueOf() && !this.idCliente) {
      if (dadosParaEnviar.enderecos.length > 0) {
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
        alert('Coloque pelo   menos 1 endereço');
      }
    } else {
      if (!this.idCliente) {
        alert('Email ja Cadastrado!');
      }
    }

    if (this.senhaCorrespondente) {
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

  apenasNumeroTelefone() {
    const telefoneControl = this.formulario.get('telefone');
    if (telefoneControl) {
      telefoneControl.setValue(telefoneControl.value.replace(/[^0-9]/g, ''));
    }
  }

  apenasNumeroCPF() {
    const telefoneControl = this.formulario.get('cpf');
    if (telefoneControl) {
      telefoneControl.setValue(telefoneControl.value.replace(/[^0-9]/g, ''));
    }
  }

  login(){
    this.router.navigate(['solicitarLogin']);
  }

}
