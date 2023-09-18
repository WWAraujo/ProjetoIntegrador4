import { Component, OnInit } from '@angular/core';
import { Produto } from './visualizar-produtos-cadastrados';
import { ProdutosService } from '../produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarregarFotos } from '../cadastrar-produtos/cadastrar-produtos';

@Component({
  selector: 'app-visualizar-produtos-cadastrados',
  templateUrl: './visualizar-produtos-cadastrados.component.html',
  styleUrls: ['./visualizar-produtos-cadastrados.component.css']
})
export class VisualizarProdutosCadastradosComponent implements OnInit {

  resultadosPesquisa: Produto[] = [];
  produtos: Produto[] = [];
  itemsPerPage: number = 10;
  page: number = 0;
  totalPages!: number;
  nextPage: boolean = false;
  beforePage: boolean = false;
  termoPesquisa!: string;
  productData: any = {};
  productImg: any = {};
  fotosProduto: CarregarFotos[] = [];
  idProduto!: number;
  imagemPrincipal!: string;
  exibirCabecalho: boolean = true;

  constructor(private service: ProdutosService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idProduto = this.service.getIdProduto()
    this.service.getProdutoCompleto(this.idProduto).subscribe(data => {
      this.productData = data;

      console.log("Dados Recebidos: " , data);

      const primeiraImagemPrincipal = this.productData.fotosProdutoRecord.find(
        (foto: { flagImg: string; }) => foto.flagImg === 'p'
      );

      if (primeiraImagemPrincipal) {
        this.imagemPrincipal = this.getFullPath(primeiraImagemPrincipal.nomeImg);
      }
    })
    }

  getFullPath(imageName: string): string {
    return `http://localhost:8080/api/upload/${imageName}`;
  }

  trocarImagemPrincipal(novaImagem: string): void {
    this.imagemPrincipal = novaImagem;
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}
