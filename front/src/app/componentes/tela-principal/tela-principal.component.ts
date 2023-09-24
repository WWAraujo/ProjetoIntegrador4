import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos/produtos.service';
import { Router } from '@angular/router';
import { ProdutoFotos } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;
@Component({
  selector: 'app-telaprincipal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent implements OnInit {
  imagemPrincipal!: string;
  idProduto: number = 3;
  productData: ProdutoFotos[] = [];
  exibirCabecalho: boolean = true;

  get productDataGroups(): any[][] {
    const groups: any[][] = [];
    for (let i = 0; i < this.productData.length; i += 4) {
      groups.push(this.productData.slice(i, i + 4));
    }
    return groups;
  }

  constructor(private service: ProdutosService, private router: Router) { }

  ngOnInit(): void {
    this.service.getListarProdutosCompletos().subscribe(data  => {
        this.productData = data;
      }
    );
  }

  getFullPath(imageName: string): string {
    return `${API}/api/upload/${imageName}`;
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
