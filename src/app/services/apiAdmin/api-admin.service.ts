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
