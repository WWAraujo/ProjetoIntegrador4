import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginaProdutos } from './listar-produtos/listar-produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private readonly API = 'http://localhost:8080/produto'

  constructor(private http: HttpClient) { }

  getProdutos(page: number): Observable<PaginaProdutos> {
    return this.http.get<PaginaProdutos>(`${this.API}/listar?page=${page}`)
  }
}
