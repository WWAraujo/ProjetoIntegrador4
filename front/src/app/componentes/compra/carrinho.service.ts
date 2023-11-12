import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private http: HttpClient) { }

  cadastrarVenda(venda: any): Observable<any>{
    return this.http.post(`${API}/vendas/cadastrar`,venda);
  }

  getVendas(id: number): Observable<number> {
    return this.http.get<number>(`${API}/vendas/${id}`)
  }
  
}
