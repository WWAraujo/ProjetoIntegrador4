import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { Venda } from 'src/app/core/types/type';

@Component({
  selector: 'app-alterar-produto-estoquista',
  templateUrl: './alterar-produto-estoquista.component.html',
  styleUrls: ['./alterar-produto-estoquista.component.css'],
})
export class AlterarProdutoEstoquistaComponent implements OnInit {
  listaProdutos: Venda[] = [];
  status: string = '';
  produto!: Venda;

  constructor(private produtosService: ProdutosService) {}

  ngOnInit() {
    this.produtosService.listarProdutosEstoquista().subscribe((dados) => {
      this.listaProdutos = dados;
    });
  }

  alterarStatus(id: number) {
    for (const elemento of this.listaProdutos) {
      if (elemento.dadosVenda.id === id) {
        this.produto = elemento;
        this.produtosService.alterarStatusEstoquista(this.produto).subscribe(
          (resp) => {
            // Verifica se a resposta é uma string
            if (typeof resp === 'string') {
              alert(`${resp}`);
            }
          },
          (error) => {
            console.error('Erro na requisição:', error);
          }
        );
      }
    }
  }
}
