import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho-nao-logado',
  templateUrl: './cabecalho-nao-logado.component.html',
  styleUrls: ['./cabecalho-nao-logado.component.css']
})
export class CabecalhoNaoLogadoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  deslogar(){
    this.router.navigate(['/solicitarLogin']);
  }

  telaPrincipal(){
    this.router.navigate(['/telaPrincipal']);
  }

}
