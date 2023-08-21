import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ApiService } from 'src/app/services/api/api.service';
import { ApiEthService } from 'src/app/services/apiEth/api-eth.service';


@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent {
  nft!: Nft;
  user!: User;
  priceEth!: number;
  isBought: boolean = false;

  constructor(private route: ActivatedRoute, private api: ApiService, private apiEth: ApiEthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nftId = params.get('id');
      this.api.getNft(nftId).subscribe(nftData => {
        this.nft = nftData;
        var token = localStorage.getItem('authToken');
        if (token) {
          const decodedToken: any = jwtDecode(token);
          this.api.getUserByEmail(decodedToken.email).subscribe(Data => {
            this.user = Data;
            this.userHasNft();
          });
          window.scrollTo(0, 0);
        }
      });
    });

  }

  addNftToUser() {
    this.apiEth.loadData().subscribe(
      (data) => {
        data.Data.Data.forEach((item: any) => {
          const date = new Date(item.time * 1000);
          date.toLocaleString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' });
          this.priceEth = item.close;
        });
        var price_eur = this.priceEth * this.nft.nftPrice.price_eth_value;
        this.api.addNftToUser(this.nft.id, this.user.id, price_eur, this.nft.nftPrice.price_eth_value)
          .subscribe(
            response => {
              console.log("réussi");
              this.api.getUserByEmail(this.user.email).subscribe(Data => {
                this.user = Data;
                this.userHasNft();
              });
              // window.location.reload();
            },
            error => {
              console.error('Une erreur s\'est produite :', error);
            }
          );
      })
  }

  userHasNft(): boolean {
    if (this.user) {
      if (!this.user.purchaseNfts) {
        this.isBought = false;
        return false;
      }
      const nftIdToCheck = this.nft.id;
      const nftsArray = Object.values(this.user.purchaseNfts) as any[];

      for (const item of nftsArray) {
        if (item.Nft.id === nftIdToCheck) {
          this.isBought = true;
          return true;
        }
      }
      this.isBought = false;
      return false;
    }
    this.isBought = false;
    return false;
  }

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
