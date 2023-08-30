import { Component, OnInit } from '@angular/core';
import { DeletarUsuario } from '../usuario';

@Component({
  selector: 'app-deletar-usuario',
  templateUrl: './deletar-usuario.component.html',
  styleUrls: ['./deletar-usuario.component.css']
})
export class DeletarUsuarioComponent implements OnInit {

  deletarUsuario!: DeletarUsuario

  constructor() { }

  ngOnInit(): void {
  }

}
