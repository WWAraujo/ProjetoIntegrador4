import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  dados = [
    { id : 1, nome : 'Item 1', preco : 10.99},
    { id : 2, nome : 'Item 2', preco : 12.59}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
