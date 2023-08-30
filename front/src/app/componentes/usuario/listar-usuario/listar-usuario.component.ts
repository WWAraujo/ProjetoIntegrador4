
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ListarUsuario } from './listar-usuarios';
import { Router } from '@angular/router';
import { DeletarUsuario } from '../usuario';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  listausuario!: ListarUsuario;
  deletarUsuario!: DeletarUsuario

  arr: Array<ListarUsuario> = [];

  constructor(
    private router: Router,
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

  deletarusuario(itemId: number){
    this.service.excluir(itemId).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload'
      this.router.navigate([this.router.url])
    })
  }

  recarregarComponente() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  cadastrarNovo(){
    this.router.navigate(['cadastrarUsuario'])
  }

}
