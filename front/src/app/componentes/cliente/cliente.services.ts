import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clienteLogado: Boolean = false;

  setClienteLogado(type: boolean){
    this.clienteLogado = type;
  }

  getClienteLogado(){
    return this.clienteLogado;
  }
}
