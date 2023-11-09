import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})

export class CarrinhoService{

  constructor(private http: HttpClient){}

  salvarVendaBackend(venda: any): Observable<any> {
    console.log('URL',`${API}`);
    console.log('dados',venda);
    return this.http.post(`${API}/vendas`, venda);
  }

}
