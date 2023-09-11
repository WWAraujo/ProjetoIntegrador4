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
  fotosProduto: CarregarFotos[] = [];
  idProduto!: number;

  constructor(private service: ProdutosService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idProduto = this.service.getIdProduto()
    this.service.getProdutosCompleto(this.idProduto).subscribe(data => {
      this.productData = data;

      console.log("Dados Recebidos: " , data);
    })

  }


  getFullPath(imageName: string): string {
    return `http://localhost:8080/api/upload/${imageName}`;
  }

}
