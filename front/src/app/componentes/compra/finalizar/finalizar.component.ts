import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.services';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class FinalizarComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.carrinhoService.setMostrarConcluir(true);
  }

}
