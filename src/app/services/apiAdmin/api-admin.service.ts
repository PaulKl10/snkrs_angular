import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://127.0.0.1:8000/api"

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }

  setUser(userid: number, pseudo: string, email: string, gender: string, lastname: string, firstname: string, birthDate: Date, adress: number): Observable<any> {
    const credentials = {pseudo, email, gender, lastname, firstname, birthDate, adress};
    return this.http.post(`${this.baseUrl}/user/${userid}/editAdmin`, credentials);
  }

  setAdress(adressId: number, street: string, code_postal: number, city: string){
    const credentials = {adressId, street, code_postal, city};
    return this.http.post(`${this.baseUrl}/adress/${adressId}/edit`, credentials);
  }

  getNfts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/nft`);
  }

  getPurchases(): Observable<any> {
    return this.http.get(`${this.baseUrl}/purchaseNft`);
  }

  deleteUser(UserId: number){
    return this.http.delete<any>(`${this.baseUrl}/user/${UserId}`);
  }

  deleteNft(NftId: number){
    return this.http.delete<any>(`${this.baseUrl}/nft/${NftId}`);
  }
}
