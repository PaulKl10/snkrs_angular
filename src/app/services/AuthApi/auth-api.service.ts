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
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  register(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    return this.http.post<any>(`${this.apiUrl}/user/new`, credentials);
  }

  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    this.router.navigate(['/acceuil']);
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    return !!authToken;
  }
}
