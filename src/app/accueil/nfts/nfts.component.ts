import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.css']
})
export class NftsComponent implements OnInit {
  nfts: Nft[] = [];
  constructor(private service: ApiService) { }

  ngOnInit() {
    this.displayNfts();
  }

  displayNfts() {
    this.service.getNfts().subscribe(
      (data) => {
        this.nfts = data;
        console.log(this.nfts);
      }
    )
  }

  getBorderClass(index: number): string {
    const classes = ['border1', 'border2', 'border3'];
    return classes[index % classes.length];
  }
}

interface Nft {
  id: number;
  name: string;
  description: string;
  img: string;
  launch_date: string;
  nftPrice: number | null;
  stock: number;
  purchaseNfts: any[];
  category: {
    name: string;
    description: string;
  };
}
