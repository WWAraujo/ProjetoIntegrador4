import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Cliente, ClienteCompleto } from 'src/app/core/types/type';
import { environment } from "src/environments/environment";


const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})

export class ClienteService{
  private readonly url = `${API}/cliente`;
  private idCliente! : number;
  private dadosAtualCliente! : Cliente;

  constructor(private http: HttpClient){}

  cadastrarCliente(cliente: any): Observable<any>{
    return this.http.post(`${API}/cliente/cadastrar-cliente`, cliente);
  }

  alterarCliente(cliente: any) {
    return this.http.put(`${API}/cliente/alterar`, cliente);
  }

  exibirPerfil(id: number) : Observable <ClienteCompleto>{
    return this.http.get<ClienteCompleto>(
      `${API}/cliente/buscarid/${id}`);

  }

  adicionarEndereco(cliente: any) {
    return this.http.put(`${API}/cliente/alterar`,cliente);
  }

  procurarEmail(email: string): Observable<boolean> {
    const caminho = 'buscaremail';
    const urlBuscarEmail = `${API}/cliente/buscaremail/${email}`;
    return this.http.get<boolean>(urlBuscarEmail);
  }

  procurarCPF(cpf: string): Observable<boolean> {
    const caminho = 'buscarcpf';
    const urlBuscarEmail = `${this.url}/${caminho}/${cpf}`;
    return this.http.get<boolean>(urlBuscarEmail);
  }

  setDadosCliente(cliente : Cliente){
    this.dadosAtualCliente = cliente;
  }

  getDadosCliente(){
    return this.dadosAtualCliente;
  }

  setIdCliente(id : number){
    this.idCliente = id;
  }

  getIdCliente(): number{
    return this.idCliente;
  }

}
