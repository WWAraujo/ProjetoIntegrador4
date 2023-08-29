import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ListarUsuario } from './listar-usuarios';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  listausuario!: ListarUsuario;

  // dados = []
  arr: Array<ListarUsuario> = [];

  constructor(
    private service: UsuarioService
  ) { }

  ngOnInit(): void {
    this.listarUsuario();
  }

  listarUsuario() {
    this.service.listarUsuario(this.listausuario).subscribe((listausuario) => {
      this.arr = listausuario;
      console.log(this.arr)
    })
  }

}
