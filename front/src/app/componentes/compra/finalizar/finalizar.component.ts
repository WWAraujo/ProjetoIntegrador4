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

  idCliente: number = 0;
  pedido!: Venda;


  constructor(
    private carrinhoService: CarrinhoServices,
    private service: CarrinhoService
    ) { }

  ngOnInit(): void {
    this.idCliente = this.carrinhoService.getIdCliente();
    console.log('Recebeu do resumo',this.idCliente);
    this.service.getVendas(this.idCliente).subscribe(data => {
      console.log('RECEBEU O PEDIDO',this.pedido);
      this.pedido = data});
  }



  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}
