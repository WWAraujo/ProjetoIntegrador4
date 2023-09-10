import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../produtos.service';
import { ModalService } from './modal.service';
import { AvaliacaoProduto, Produto, CarregarFotos } from './cadastrar-produtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css'],
})
export class CadastrarProdutosComponent implements OnInit {
  modalAberto = false;
  formularioProduto!: FormGroup;

  produto: Produto = {
    id: 0,
    nomeProduto: '',
    descricaoDetalhadaProduto: '',
    precoProduto: 0,
    qtdEstoque: 0,
    ativoInativo: '',
  };

  avaliacaoProdutoRecord: AvaliacaoProduto = {
    idProduto: 0,
    avaliacao: 0,
  };

  fotosProduto: CarregarFotos[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    public modalservice: ModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioProduto = this.formBuilder.group({
      produto: this.produto,
      avaliacaoProdutoRecord: this.avaliacaoProdutoRecord,
      fotosProdutoRecord: this.fotosProduto,
    });

    this.modalservice.fecharModalEvent.subscribe(() => {
      this.fecharModal();
    });
  }

  submitForm() {
    const dadosParaEnviar = {
      produto: this.produto,
      avaliacaoProdutoRecord: this.avaliacaoProdutoRecord,
      fotosProdutoRecord: this.fotosProduto,
    };

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

  abrirModal() {
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  getFullPath(imageName: string): string {
    return `http://localhost:8080/api/upload/${imageName}`;
  }

  receberListaFotos(fotos: CarregarFotos[]) {
    this.fotosProduto = fotos;
  }

  irParaListaProdutos() {
    this.router.navigate(['listarProduto']);
  }
}
