import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})

export class ModalenderecoService {

  constructor(private http: HttpClient) { }

  listaEnderecos: Endereco[] = [];

  fecharModalEvent: EventEmitter<void> = new EventEmitter<void>();

  fecharModal() {
    this.fecharModalEvent.emit();
  }

  getListaEndereco() {
    return this.listaEnderecos;
  }

  setListaEndereco(endereco: Endereco[]) {
    this.listaEnderecos = endereco;
  }

  buscarEndereco(cep: string): Observable<any> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url);
  }

  salvarEndereco(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(`${API}/endereco`, endereco)
  }
}
