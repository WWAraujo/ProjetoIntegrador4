import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarUsuario } from './listar-usuario/listar-usuarios';
import { CadastroUsuario } from './cadastro-usuario/cadastro-usuario';
import { AlterarUsuario } from './alterar-usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly API = 'http://localhost:8080/usuario';
  private alterarUsuario!: AlterarUsuario;

  constructor(private http: HttpClient) {}

  listarUsuarios(ListarUsuario: ListarUsuario): Observable<ListarUsuario[]> {
    return this.http.get<ListarUsuario[]>(this.API);
  }

  excluir(id: number): Observable<ListarUsuario> {
    const url = `${this.API}/${id}`;
    return this.http.delete<ListarUsuario>(url);
  }

  cadastrar(cadastro: CadastroUsuario): Observable<CadastroUsuario> {
    return this.http.post<CadastroUsuario>(this.API, cadastro);
  }

  procurarEmail(email: string): Observable<boolean> {
    const caminho = 'buscaremail';
    const urlBuscarEmail = `${this.API}/${caminho}/${email}`;
    return this.http.get<boolean>(urlBuscarEmail);
  }

  procurarPorId(itemId: number): Observable<AlterarUsuario> {
    const caminho = 'buscarid';
    const urlBuscarId = `${this.API}/${caminho}/${itemId}`;
    return this.http.get<AlterarUsuario>(urlBuscarId);
  }

  setAlterarUsuario(usuario: AlterarUsuario) {
    this.alterarUsuario = usuario;
  }

  getAlterarUsuario() {
    return this.alterarUsuario;
  }

  alterar(atualizarUsuario: AlterarUsuario): Observable<Object> {
    return this.http.put(this.API, atualizarUsuario);
  }
}
