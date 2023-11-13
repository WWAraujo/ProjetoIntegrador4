import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { Venda } from 'src/app/core/types/type';
import { CarrinhoServices } from '../carrinho.services';


@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

  idPedido: number = 0;
  pedido!: Venda;


  constructor(
    private carrinhoServices: CarrinhoServices,
    private service: CarrinhoService
    ) { }

  ngOnInit(): void {
    this.idPedido = this.carrinhoServices.getIdVendaSalvaBanco();
    this.service.getVenda(this.idPedido).subscribe((response) => {
      console.log('response',response);
      this.pedido = response;
    });

  }



  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}
