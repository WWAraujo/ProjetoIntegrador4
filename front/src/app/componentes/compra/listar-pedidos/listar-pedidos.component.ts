import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { DadosVenda, FormaPagamento, ProdutosVenda, Venda } from 'src/app/core/types/type';


@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class FinalizarComponent implements OnInit {

  cliente: number = 1;
  dados: Venda[] = [];

  constructor(private carrinhoservice: CarrinhoService) { }

  ngOnInit(): void {
    this.carrinhoservice.getVendas(this.cliente).subscribe((response) => {
      this.dados = response;
    });

}
}
