import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../../usuario/user.services';
import { CarregarFotos, Produto } from 'src/app/core/types/type';

const API = environment.apiURL;
@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css'],
})
export class CadastrarProdutosComponent implements OnInit {

  modalAberto = false;
  formularioProduto!: FormGroup;
  idProduto!: number;
  isEstoquista: boolean = false;
  isAdmin: boolean = false;
  isCliente: boolean = false;

  produto: Produto = {
    id: 0,
    nomeProduto: '',
    descricaoDetalhadaProduto: '',
    precoProduto: 0,
    qtdEstoque: 0,
    ativoInativo: 'ATIVO',
    avaliacao: 5.0,

  };

  fotosProduto: CarregarFotos[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    public modalservice: ModalService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userType = this.userService.getUserType();
    if (userType === '1') {
      this.isAdmin = true;
    } else if (userType === '2') {
      this.isEstoquista = true;
    } else if (userType === '3') {
      this.isCliente = true;
    }


    this.modalservice.fecharModalEvent.subscribe(() => {
      this.fecharModal();
    });

    this.idProduto = this.produtosService.getIdProduto()
    if(this.idProduto) {
      this.produtosService.getProduto(this.idProduto).subscribe(data => {

        this.produto = data.produto;
        this.fotosProduto = data.fotosProdutoRecord;
      })
    }
  }

  removeItem(itemToRemove: CarregarFotos) {
    const index = this.fotosProduto.findIndex(item => item.idProduto === itemToRemove.idProduto);
    if (index !== -1) {
      this.fotosProduto.splice(index, 1);
    }
    console.log('lista depois ', this.fotosProduto)
  }

  submitForm() {
    const dadosParaEnviar = {
      produto: this.produto,
      //avaliacaoProdutoRecord: this.avaliacaoProdutoRecord,
      fotosProdutoRecord: this.fotosProduto,
    };

    if(!this.idProduto) {
      this.produtosService.cadastrarProduto(dadosParaEnviar).subscribe(
        (response) => {
          alert('Produto cadastrado com sucesso.');
          this.router.navigate(['listarProduto']);
        },
        (error) => {
          console.error('Erro ao cadastrar produto:', error);
          alert('Erro ao cadastrar produto:');
        }
      );
    }

    if (this.idProduto){
      this.produtosService.alterarProduto(dadosParaEnviar).subscribe(
        (response) => {
          alert('Produto cadastrado com sucesso.');
          this.router.navigate(['listarProduto']);
        },
        (error) => {
          console.error('Erro ao cadastrar produto:', error);
          alert('Erro ao cadastrar produto:');
        }
      );
    }
  }

  buscarProduto(){
    this.produtosService.getProduto(this.idProduto).subscribe(data => {
      //this.avaliacaoProdutoRecord = data.avaliacaoProdutoRecord;
      this.fotosProduto = data.fotosProdutoRecord;
    })
  }

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  getFullPath(imageName: string): string {
    return `${API}/api/upload/${imageName}`;
  }

  receberListaFotos(fotos: CarregarFotos[]) {
    this.fotosProduto = fotos;
  }

  enviarListaFotos(){
    return this.fotosProduto;
  }

  irParaListaProdutos() {
    this.router.navigate(['listarProduto']);
  }

//  novaAvaliacao() {
//    this.avaliacaoProdutoRecord.idProduto = 0;
//    this.avaliacaoProdutoRecord.avaliacao = 0;
//  }
}
