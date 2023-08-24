import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user!: User;

  constructor(private router: Router, private api: ApiService){}

  ngOnInit() {
    var token = localStorage.getItem('authToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          if (decodedToken.username) {
          this.api.getUserByEmail(decodedToken.username).subscribe(Data => {
            this.user = Data;
            console.log(this.user);
          });
        }
      }
      
    }

    getBorderClass(index: number): string {
      const classes = ['border1', 'border2', 'border3'];
      return classes[index % classes.length];
    }

    deleteNft(PurchaseId: number, Nft: Nft): void {
      this.api.deleteNftFromUser(PurchaseId).subscribe(Response => {
        console.log("Achat supprimer");
        this.api.setNft(Nft.id, Nft.name, Nft.Category.id, Nft.description, Nft.img, Nft.stock+1).subscribe(Data => {
          console.log("Stock recharger");
        });
        this.api.getUserByEmail(this.user.email).subscribe(Data => {
        this.user = Data;
      });
      }, error =>{
        console.error("Erreur lors de la suppression du NFT :", error);
      }
      );
    }
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
  purchaseNfts: PurchaseNft[]
}

interface PurchaseNft {
  Nft: Nft;
  id: number;
  nft_eth_price: number;
  nft_eur_price: number;
  purchase_date: Date;
}

interface Nft {
  id: number;
  name: string;
  img: string;
  description: string;
  stock: number;
  Category: Category;
  launch_date: Date;
  // ... autres propriétés spécifiques du NFT
}

interface Category{
  id: number;
  name: string;
  description: string;
}