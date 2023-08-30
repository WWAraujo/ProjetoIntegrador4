import { DeletarUsuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarUsuario } from './listar-usuario/listar-usuarios';
import { CadastroUsuario } from './cadastro-usuario/cadastro-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/usuario'

  constructor(private http: HttpClient) { }

  listarUsuario(ListarUsuario:ListarUsuario): Observable<ListarUsuario[]> {
    return this.http.get<ListarUsuario[]>(this.API)
  }

  excluir(id: number): Observable<ListarUsuario> {
    const url = `${this.API}/${id}`
    return this.http.delete<ListarUsuario>(url)
  }

  cadastrar(cadastro: CadastroUsuario): Observable<CadastroUsuario>{
    return this.http.post<CadastroUsuario>(this.API, cadastro)
  }
}
