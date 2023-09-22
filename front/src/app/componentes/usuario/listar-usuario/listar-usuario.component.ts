import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { AlterarUsuario, ListarUsuario } from 'src/app/core/types/type';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css'],
})
export class ListarUsuarioComponent implements OnInit {
  listausuario!: ListarUsuario;
  alterarUser!: AlterarUsuario;
  exibirCabecalho: boolean = true;
  arr: Array<ListarUsuario> = [];

  constructor(private router: Router, private service: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  filter(event: Event) {
    const filtvalue = (event.target as HTMLInputElement).value.toLowerCase();
    this.service.listarUsuarios(this.listausuario).subscribe((listausuario) => {
      this.arr = listausuario.filter((usuario) => {
        return (
          usuario.nomeUsuario.toLowerCase().includes(filtvalue) ||
          usuario.emailUsuario.toLowerCase().includes(filtvalue)
        );
      });
    });
  }

  listarUsuarios() {
    this.service.listarUsuarios(this.listausuario).subscribe((listausuario) => {
      this.arr = listausuario;
    });
  }

  deletarUsuario(itemId: number) {
    this.service.excluir(itemId).subscribe(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
    });
  }

  cadastrarNovo() {
    this.router.navigate(['/cadastrarUsuario']);
  }

  alterarUsuario(itemId: number) {
    this.service.procurarPorId(itemId).subscribe((usuario) => {
      this.alterarUser = usuario;
      this.service.setAlterarUsuario(this.alterarUser);
      if (this.alterarUser) {
        this.router.navigate(['/alterarUsuario']);
      }
    });
  }

  recarregarComponente() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
