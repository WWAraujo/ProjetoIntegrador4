import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarUsuario } from './listar-usuario/listar-usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:8080/usuario'

  constructor(private http: HttpClient) { }

  listarUsuario(ListarUsuario:ListarUsuario): Observable<ListarUsuario[]> {
    return this.http.get<ListarUsuario[]>(this.API)
  }
}
