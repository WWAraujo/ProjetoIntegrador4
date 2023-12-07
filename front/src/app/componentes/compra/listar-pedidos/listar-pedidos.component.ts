import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { Venda } from 'src/app/core/types/type';
import { CarrinhoServices } from '../carrinho.services';



@Component({
  selector: 'app-listar-pedidos',
  templateUrl: './listar-pedidos.component.html',
  styleUrls: ['./listar-pedidos.component.css']
})
export class ListarPedidosComponent implements OnInit {

  idPedido: number = 0;
  dados!: Venda ;

  constructor(private carrinhoservice: CarrinhoService,
    private carrinhoservices: CarrinhoServices) { }

  ngOnInit(): void {
    this.idPedido = this.carrinhoservices.getIdVendaSalvaBanco();
    this.carrinhoservice.getVenda(this.idPedido).subscribe((response) => {
      console.log('response',response);
      this.dados = response;
    });

}
}
