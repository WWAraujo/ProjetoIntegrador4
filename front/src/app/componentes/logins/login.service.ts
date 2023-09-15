import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logado, Login } from 'src/app/core/types/type';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(login: Login): Observable<Logado> {
    return this.http.post<Logado>(`${API}/login`, login);
  }
}
