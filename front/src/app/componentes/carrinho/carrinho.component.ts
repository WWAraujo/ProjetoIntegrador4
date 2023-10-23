import { Produto } from './../../core/types/type';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos/produtos.service';
import { Router } from '@angular/router';
import { ProdutoFotos } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';
import { CarrinhoService } from './carrinho.services';

const API = environment.apiURL;

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  idProduto!: number;
  productData: ProdutoFotos[] = [];
  imagemPrincipal!: string;
  itensNoCarrinho!: number[];
  resultados: any[] = [];
  idsCount: { [id: number]: number } = {};
  subtotal: number = 0;

  constructor(private service: CarrinhoService, private router: Router, private serviceProduto: ProdutosService) { }

  ngOnInit(): void {
    this.itensNoCarrinho = this.service.getIdsSelecionados();
    this.itenNoCarrinho();

  }

  itenNoCarrinho() {

    for (let i = 0; i < this.itensNoCarrinho.length; i++) {
      const id = this.itensNoCarrinho[i];
      if (this.idsCount[id]) {
        this.idsCount[id]++;
      } else {
        this.idsCount[id] = 1;
        this.serviceProduto.getProdutoCompleto(id)
          .subscribe((data) => {
            this.productData.push(data);
            this.subtotalCarrinho();
          });
      }
    }
  }

  subtotalCarrinho(){
    this.subtotal = 0;
    for(let produto of this.productData){
      const precoProduto = produto.produto.precoProduto;
      const quantidade = this.idsCount[produto.produto.id];

      if(quantidade){
        this.subtotal += precoProduto * quantidade;
      }
    }
  }

  getFullPath(imageName: string): string {
    return `${API}/api/upload/${imageName}`;
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  paginaPrincipal(){
    this.router.navigate(['telaPrincipal'])
  }

}
