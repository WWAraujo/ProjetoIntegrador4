import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, Logado, Cliente } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  loginColaborador(login: Login): Observable<Logado> {
    return this.http.post<Logado>(`${API}/login/usuario`, login);
  }

  loginCliente(login: Login): Observable<Cliente> {
    return this.http.post<Cliente>(`${API}/login/cliente`, login);
  }

  saveData(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string) {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string) {
    sessionStorage.removeItem(key);
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  getLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
