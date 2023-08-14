import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://127.0.0.1:8000/api"

  getNfts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/nft`);
  }

  getNft($id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/nft/${$id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/category`);
  }

  getCategory($id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${$id}`);
  }
}
