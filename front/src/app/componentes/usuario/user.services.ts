import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userType: string = '';
  private usuarioLogado: Boolean = false;

  setUserType(type: string) {
    this.userType = type;
  }

  getUserType() {
    return this.userType;
  }

  setUsuarioLogado(type: boolean){
    this.usuarioLogado = type;
  }

  getUsuarioLogado(){
    return this.usuarioLogado;
  }
}
