import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Venda } from 'src/app/core/types/type';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor(private http: HttpClient) { }

  cadastrarVenda(venda: any): Observable<any>{
    return this.http.post(`${API}/vendas/cadastrar`,venda);
  }

  getVendas(id: number): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${API}/vendas/${id}`)
  }

}
