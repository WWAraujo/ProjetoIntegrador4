import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';
import { Observable } from 'rxjs';
import { Logado } from './logado';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<Logado> {
    return this.http.post<Logado>(this.API, login);
  }
}
