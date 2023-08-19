import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiNewsletterService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  add(email: string) {
    const credentials = { email };
    return this.http.post<any>(`${this.apiUrl}/newsletter/new`, credentials);
  }
}
