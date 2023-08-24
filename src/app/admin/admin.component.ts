import { Component } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ApiAdminService } from '../services/apiAdmin/api-admin.service';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
isAdmin: boolean = false;
users!: User[];
nfts!: Nft[];

constructor(private apiAdmin: ApiAdminService, private api: ApiService){}

ngOnInit() {
  const authToken = localStorage.getItem('authToken');
    if (authToken){
      const decodedToken: any = jwtDecode(authToken);
        if(decodedToken.roles.includes('ROLE_ADMIN')){
          this.isAdmin = true;
          this.getUsers();
          this.getNfts();
        }
    }
}

getUsers(): void{
  this.apiAdmin.getUsers().subscribe({
    next: (response) => {
      this.users = response;
    }
  });
}

getNfts(): void{
  this.apiAdmin.getNfts().subscribe({
    next: (response) => {
      this.nfts = response;
    }
  });
}

deleteUser(UserId: number){
  this.deletePurchaseNftToUser(UserId);
  this.apiAdmin.deleteUser(UserId).subscribe(
    {
      next: (response) =>{
        console.log("Utilisateur supprimé !");
        this.getUsers();
      },
      error:(error) =>{
        console.error("Erreur lors de la suppresion"+error);
      }
    }
  )
}

deleteNft(NftId: number){
  this.deletePurchaseNftFromNft(NftId);
  this.apiAdmin.deleteNft(NftId).subscribe(
    {
      next: (response) =>{
        console.log("Nft supprimé !");
        this.getNfts();
      },
      error:(error) =>{
        console.error("Erreur lors de la suppresion"+error);
      }
    }
  )
}

deletePurchaseNftToUser(UserId: number){
  this.apiAdmin.getPurchases().forEach((purchases: PurchaseNft[]) => {
    purchases.forEach((purchase: PurchaseNft) => {
      if(purchase.User.id === UserId){
        this.api.deleteNftFromUser(purchase.id).subscribe({
          next: (response) => console.log("Achat de l'utilisateur supprimé")
        })
      }
    });
  })
}
deletePurchaseNftFromNft(NftId: number){
  this.apiAdmin.getPurchases().forEach((purchases: PurchaseNft[]) => {
    purchases.forEach((purchase: PurchaseNft) => {
      if(purchase.Nft.id === NftId){
        this.api.deleteNftFromUser(purchase.id).subscribe({
          next: (response) => console.log("Achat de l'utilisateur supprimé")
        })
      }
    });
  })
}
}

interface PurchaseNft {
  id: number;
  User: UserPurchase;
  Nft: Nft;
  nft_eth_price: number;
  nft_eur_price: number;
  purchase_date: Date;
}

interface Nft {
  id: number;
  name: string;
  description: string;
  img: string;
  launch_date: string;
  nftPrice: {
    price_date: Date;
    price_eth_value: number;
  };
  stock: number;
  purchaseNfts: any[];
  category: {
    name: string;
    description: string;
  };
}

interface UserPurchase {
  id: number;
  pseudo: string;
}

interface User {
  id: number;
  email: string;
  pseudo: string;
  birthDate: Date;
  firstname: string;
  lastname: string;
  Adress: {
    street: string;
    code_postal: number;
    city: string;
  }
  purchaseNfts: {
    Nft: {
      id: number;
      name: string;
    }
  }
}
