import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { CarrinhoServices } from '../carrinho.services';


@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

  constructor(
    private service: CarrinhoService,
    private carrinhoService: CarrinhoServices) { }

  ngOnInit(): void {
    this.carrinhoService.setMostrarConcluir(true);
  }

}
