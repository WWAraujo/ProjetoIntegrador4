import { Component, OnInit } from '@angular/core';

import { ProdutosService } from '../produtos/produtos.service';
import { Produto } from './tela-principal';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-telaprincipal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaprincipalComponent implements OnInit {
  produtos: Produto[] = [];
  imagemPrincipal!: string;
  itemsPerPage: number = 10;
  page: number = 0;
  totalPages!: number;
  nextPage: boolean = false;
  beforPage: boolean = false;
  idProduto: number = 3;
  productData: any= {};
  exibirCabecalho: boolean = true;

  get productDataGroups(): any[][] {
    const groups: any[][] = [];
    for (let i = 0; i < this.productData.length; i += 3) {
      groups.push(this.productData.slice(i, i + 3));
    }
    return groups;
  }

  constructor(private service: ProdutosService, private router: Router) { }

  ngOnInit(): void {
    this.service.getListarProdutosCompletos().subscribe(data  => {
        this.productData = data;
        console.log("Dados Recebidoss" ,data);

        const primeiraImagemPrincipal = this.productData.fotosProdutoRecord(
        (foto: { flagImg: string; }) => foto.flagImg === 'p'
      );

        if (primeiraImagemPrincipal) {
          this.imagemPrincipal = this.getFullPath(primeiraImagemPrincipal.nomeImg);
        }
      }
    );
       }

  getFullPath(imageName: string): string {
    return `http://localhost:8080/api/upload/${imageName}`;
  }

  trocarImagemPrincipal(novaImagem: string): void {
    this.imagemPrincipal = novaImagem;
  }

  pegarId(idProduto: number) {
    this.service.setIdProduto(idProduto);
    this.router.navigate(['/produtoDetalhado']);
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }


}
