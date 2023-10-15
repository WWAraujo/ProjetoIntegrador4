import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";


const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})

export class ClienteService{
  private readonly url = `${API}/cliente`;
  private FormularioCliente: any;

  constructor(private http: HttpClient){}

  cadastrarCliente(cliente: any): Observable<any>{
    return this.http.post(`${API}/cliente/cadastrar-cliente`, cliente);
  }

  alterarCliente(cliente: any) {
    return this.http.put(`${API}/cliente/alterar-cliente`, cliente);
  }

  procurarEmail(email: string): Observable<boolean> {
    const caminho = 'buscaremail';
    const urlBuscarEmail = `${this.url}/${caminho}/${email}`;
    return this.http.get<boolean>(urlBuscarEmail);
  }

  setDadosCliente(data: any){
    this.FormularioCliente = data;
  }

  getDadosCliente(){
    return this.FormularioCliente;
  }

  

}
