import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Logado, Cliente } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}

  loginColaborador(login: Login): Observable<Logado> {
    return this.http.post<Logado>(`${API}/login/usuario`, login);
  }

  loginCliente(login: Login): Observable<Cliente> {
    return this.http.post<Cliente>(`${API}/login/cliente`, login);
  }

  // Método para salvar os dados no Local Storage
  saveData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Método para recuperar os dados do Local Storage
  getData(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Método para remover os dados do Local Storage
  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
