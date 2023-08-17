import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pensamento: Pensamento = {
    id: 1,
    conteudo: 'Aprendendo Angular',
    autoria: 'Dev',
    modelo: 'modelo1'
  }

  constructor() { }

  ngOnInit(): void {
  }

  criarPensamentos() {
    alert("Novo pensamento criado")
  }

  cancelar() {
    alert("Cancelado com sucesso")
  }
}
