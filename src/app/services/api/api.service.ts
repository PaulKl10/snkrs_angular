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

  setNft($id: any, name: string, category: number, description: string, img: string, stock: number): Observable<any>{
    const credentials = { name, category, description, img, stock };
    return this.http.post(`${this.baseUrl}/nft/${$id}/edit`, credentials);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/category`);
  }

  getCategory($id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${$id}`);
  }

  addNftToUser(nft: number, user: number, prix_eur: number, prix_eth: number) {
    const credentials = { nft, user, prix_eur, prix_eth };
    console.log(credentials);
    return this.http.post<any>(`${this.baseUrl}/purchaseNft/new`, credentials);
  }

  getUserByEmail(email: string) {
    const credentials = { email };
    return this.http.post<any>(`${this.baseUrl}/user/findBy`, credentials);
  }

  deleteNftFromUser(PurchaseId: number){
    return this.http.post<any>(`${this.baseUrl}/purchaseNft/${PurchaseId}`,"" );
  }
}
