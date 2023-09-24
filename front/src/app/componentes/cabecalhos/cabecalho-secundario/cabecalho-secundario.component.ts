import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho-secundario',
  templateUrl: './cabecalho-secundario.component.html',
  styleUrls: ['./cabecalho-secundario.component.css']
})
export class CabecalhoSecundarioComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  deslogar(){
    this.router.navigate(['/solicitarLogin']);
  }

  telaPrincipal(){
    this.router.navigate(['/telaPrincipal']);
  }
}
