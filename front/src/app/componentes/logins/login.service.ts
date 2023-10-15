import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Logado } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}

  loginColaborador(login: Login): Observable<Logado> {
    return this.http.post<Logado>(`${API}/login/colaborador`, login);
  }

  loginCliente(login: Login): Observable<Logado> {
    return this.http.post<Logado>(`${API}/login/cliente`, login);
  }

}
