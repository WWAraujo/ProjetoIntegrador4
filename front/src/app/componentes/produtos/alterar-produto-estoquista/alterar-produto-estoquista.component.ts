import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { Venda } from 'src/app/core/types/type';

@Component({
  selector: 'app-alterar-produto-estoquista',
  templateUrl: './alterar-produto-estoquista.component.html',
  styleUrls: ['./alterar-produto-estoquista.component.css']
})
export class AlterarProdutoEstoquistaComponent implements OnInit {

  listaProdutos: Venda[]=[];
  status: string = '';
  produto!: Venda;
  response: string = '';

  constructor(private produtosService: ProdutosService) {}

  ngOnInit() {
    this.produtosService.listarProdutosEstoquista().subscribe((dados) => {
      this.listaProdutos = dados;
    });
  }

  alterarStatus(id: number, status: string){
    console.log(`Alterando status para ${status} do item com id ${id}`);
    this.produtosService.alterarStatusEstoquista(this.produto).subscribe((resp)=>{
      this.response = resp;
      console.log(resp);
    })
  }

}
