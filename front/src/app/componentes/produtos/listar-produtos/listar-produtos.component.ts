import { Component, Input, OnInit } from '@angular/core';
import { Produto } from './listar-produtos';
import { ProdutosService } from '../produtos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css'],
})
export class ListarProdutosComponent implements OnInit {

  produtos: Produto[] = [];
  itemsPerPage: number = 10; // Número de itens por página
  page: number = 0; // Página atual
  totalPages!: number;
  nextPage: boolean = false;
  beforPage: boolean = false;

  constructor(
    private service: ProdutosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.service.getProdutos(this.page).subscribe((response) => {
      console.log(this.page)
      this.produtos = response.content;
      this.totalPages = response.totalPages

      if(response.totalPages > 1) {
        this.nextPage = true
      }
      console.log(response)

    })
  }

  paginaAlterada(pagina: number) {
    this.page = pagina;
  }

  proximaPagina(){
    if(this.totalPages > this.page+1){
      this.page = this.page + 1;
      this.beforPage = true;
      this.listarProdutos();
      if (this.page+1 === this.totalPages){
        this.nextPage = false;
      }
    } else{
      this.nextPage = false;
    }

  }

  paginaAnterior(){
    if (this.page > 0 ){
      this.page = this.page - 1;
      this.nextPage = true;
      this.listarProdutos();
      if (this.page === 0 ){
        this.beforPage = false;
      }
    } else{
      this.beforPage = false;
    }
  }

  cadastrarNovo() {
  }

  alterarProduto(id: number) {
  }

  deletarProduto(id: number) {
  }
}
