import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente, Endereco, Genero } from 'src/app/core/types/type';
import { ClienteService } from '../cliente.service';
import { ModalenderecoService } from '../modalendereco.service';
import { Observable, Subject } from 'rxjs';
import { nomeClienteValidator } from '../validadorCliente';

@Component({
  selector: 'app-alterar-cliente',
  templateUrl: './alterar-cliente.component.html',
  styleUrls: ['./alterar-cliente.component.css']
})
export class AlterarClienteComponent implements OnInit {

  formulario!: FormGroup;
  exibirCabecalho: boolean = true;
  emailEncontrado: boolean = false;
  cpfEncontrado: boolean = false;
  senhaCorrespondente: boolean = false;
  idCliente!: number;
  dadosCliente!: Cliente;
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
    private serviceCliente: ClienteService,
    private serviceEndereco: ModalenderecoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {

    const listaEnderecoAtual = this.serviceEndereco.getListaEndereco();
    this.idCliente = this.serviceCliente.getIdCliente();
    const clienteAtual = this.serviceCliente.getDadosCliente();

    if (listaEnderecoAtual) {
      this.enderecoData = listaEnderecoAtual;
    }

    this.idCliente = 3; //chumbado um id
    if (this.idCliente) {
      this.serviceCliente.exibirPerfil(this.idCliente).subscribe((data) => {
        this.dadosCliente = data.cliente;
        if (!clienteAtual){
          this.cliente = data.cliente;
          this.cliente.confirmacaoSenha = data.cliente.senhaCliente;
        } else {
          this.cliente = clienteAtual;
          this.cliente.confirmacaoSenha = clienteAtual.senhaCliente;
        }

        if (listaEnderecoAtual.length < 1) {
          this.enderecoData = data.enderecos;
        }
      });
    }

    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, nomeClienteValidator()]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      confirmacaoSenha: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  verificaDadosInseridos() {
    console.log('cliente', this.cliente);
    console.log('Dados CLiente', this.dadosCliente);
    if (
      this.cliente.nomeCliente != this.dadosCliente.nomeCliente ||
      this.cliente.generoCliente != this.dadosCliente.generoCliente ||
      this.cliente.datanascCliente != this.dadosCliente.datanascCliente
    ) {
      return true;
    } else {
      return false;
    }
  }


  alterarCliente() {
    const dadosParaEnviar = {
      cliente: this.cliente,
      enderecos: this.enderecoData,
    };

    this.serviceCliente
    .alterarCliente(dadosParaEnviar)
    .subscribe((clienteCadastrado) => {
      if (clienteCadastrado) {
        alert('Informações alterada com sucesso');
      } else {
          alert('Algo deu errado no cadastro');
      }
    });

    // if (this.idCliente) {
    //   let verificar = this.verificaDadosInseridos();
    //   if (verificar) {

    //     if (this.senhaCorrespondente) {
    //       this.serviceCliente
    //       .alterarCliente(dadosParaEnviar)
    //       .subscribe((clienteCadastrado) => {
    //         if (clienteCadastrado) {
    //           alert('Informações alterada com sucesso');
    //         } else {
    //           alert('Algo deu errado no cadastro');
    //         }
    //       });
    //     } else {
    //       alert('Senhas diferentes');
    //     }
    //   } else {
    //     alert('Não encontrei alterações para fazer');
    //   }
    // } else {
    //   alert('Ops, algo deu errado');
    // }

  }


  addEnderecos() {
    this.serviceCliente.setIdCliente(this.idCliente);
    this.serviceCliente.setDadosCliente(this.cliente);
    this.serviceEndereco.setListaEndereco(this.enderecoData);
    this.router.navigate(['/endereco']);
  }

  validarSenha() {
      const senha = this.cliente.senhaCliente;
      const confirmacaoSenha = this.formulario.get('confirmacaoSenha')?.value;
      this.senhaCorrespondente  = senha === confirmacaoSenha;
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
