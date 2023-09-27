import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {
  exibirCabecalho: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  Login(){
    this.router.navigate(['/solicitarLogin'])
  }

}
