import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { Router } from '@angular/router';
import { CarregarFotos, Produto } from 'src/app/core/types/type';

@Component({
  selector: 'app-visualizar-produtos-cadastrados',
  templateUrl: './visualizar-produtos-cadastrados.component.html',
  styleUrls: ['./visualizar-produtos-cadastrados.component.css']
})
export class VisualizarProdutosCadastradosComponent implements OnInit {


  productData: any = {};
  idProduto!: number;
  imagemPrincipal!: string;

  constructor(private service: ProdutosService, private router: Router) {}


  ngOnInit(): void {
    this.idProduto = this.service.getIdProduto()

    this.service.getProduto(this.idProduto).subscribe(data => {
      this.productData = data;

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
