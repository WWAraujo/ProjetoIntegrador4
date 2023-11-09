import { Component, OnInit } from '@angular/core';
import { CarrinhoServices } from '../carrinho.services';


@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

  id: number = 0;
  teste: string = 'Retorno teste';

  constructor(private carrinhoService: CarrinhoServices) { }

  ngOnInit(): void {
    this.carrinhoService.getVendas(1).subscribe((response) => {
      console.log('Retorno get', response);
      this.id = response;
    });
    this.carrinhoService.teste(1).subscribe((response) => {
      console.log('Retorno teste', response);
      this.teste = 'Retorno teste',response;
    });
  }

}
