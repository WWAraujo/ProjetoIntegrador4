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
  resultadosPesquisa: Produto[] = [];
  itemsPerPage: number = 10; // Número de itens por página
  page: number = 0; // Página atual
  totalPages!: number;
  nextPage: boolean = false;
  beforPage: boolean = false;
  termoPesquisa!: string;
  id: Produto [] = [];
  exibirCabecalho: boolean = true;

  constructor(private service: ProdutosService, private router: Router) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    if (this.resultadosPesquisa.length > 0) {
      // Se houver resultados de pesquisa, use-os
      this.produtos = this.resultadosPesquisa;
    } else {
      // Caso contrário, busque a lista principal de produtos
      this.service.getProdutos(this.page).subscribe((response) => {
        this.produtos = response.content;
        this.totalPages = response.totalPages;

        if (response.totalPages > 1) {
          this.nextPage = true;
        }
      });
    }
  }

  paginaAlterada(pagina: number) {
    this.page = pagina;
  }

  proximaPagina() {
    if (this.totalPages > this.page + 1) {
      this.page = this.page + 1;
      this.beforPage = true;
      this.listarProdutos();
      if (this.page + 1 === this.totalPages) {
        this.nextPage = false;
      }
    } else {
      this.nextPage = false;
    }
  }

  paginaAnterior() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.nextPage = true;
      this.listarProdutos();
      if (this.page === 0) {
        this.beforPage = false;
      }
    } else {
      this.beforPage = false;
    }
  }

  pesquisar() {
    if (!this.termoPesquisa) {
      this.listarProdutos();
    } else {
      this.service
        .getProdutosByString(this.termoPesquisa)
        .subscribe((response) => {
          this.produtos = response;
          this.router.navigate([this.router.url]);
        });
    }
  }

  cadastrarNovo() {
    this.service.setIdProduto(0);
    this.router.navigate(['/cadastrarProduto']);
  }

  alterarProduto(idProduto: number) {
    this.service.setIdProduto(idProduto);
    this.router.navigate(['/cadastrarProduto']);
  }

  deletarProduto(id: number, status: string) {
    this.service.excluir(id, status).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
    });
  }

  pegarId(idProduto: number) {
    this.service.setIdProduto(idProduto);
    this.router.navigate(['/visualizarProdutos']);
  }
}
