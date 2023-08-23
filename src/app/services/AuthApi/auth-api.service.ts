import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const AUTH_TOKEN_KEY = 'authToken';
const USERNAME_KEY = 'username';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login_check`, credentials);
  }

  register(pseudo: string, email: string, password: string, gender: string, lastname: string, firstname: string, birthDate: Date, adress: number): Observable<any> {
    const credentials = { pseudo, email, password, gender, lastname, firstname, birthDate, adress };
    return this.http.post<any>(`${this.apiUrl}/register`, credentials);
  }

  adressRegister(street: string, code_postal: number, city: string): Observable<any> {
    const credentials = { street, code_postal, city };
    return this.http.post<any>(`${this.apiUrl}/adress/new`, credentials);
  }

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    this.router.navigate(['/accueil']);
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!authToken;
  }
}
