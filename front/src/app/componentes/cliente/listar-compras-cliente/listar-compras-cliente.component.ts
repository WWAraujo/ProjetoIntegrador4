import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente, Venda } from 'src/app/core/types/type';
import { LoginService } from '../../logins/login.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listar-compras-cliente',
  templateUrl: './listar-compras-cliente.component.html',
  styleUrls: ['./listar-compras-cliente.component.css']
})
export class ListarComprasClienteComponent implements OnInit {

  listaProdutos: Venda[] = [];
  dadosCliente!: Cliente;
  templateAberto: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private loginService: LoginService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.dadosCliente = this.loginService.getData('clienteData');
    this.clienteService.listarCompras(this.dadosCliente.id).subscribe((lista) => {
      this.listaProdutos = lista;
      console.log(lista);
    })
  }

  abrirTemplate(idVenda: number) {
    this.templateAberto = true;
    console.log('Id', idVenda);
    
  }
}
