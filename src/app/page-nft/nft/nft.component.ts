import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.css']
})
export class NftComponent {
  nft!: Nft;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nftId = params.get('id');
      this.api.getNft(nftId).subscribe(nftData => {
        this.nft = nftData;
        console.log(this.nft);
      });
    });
    window.scrollTo(0, 0);
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
