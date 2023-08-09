import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  nfts: any = [];
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
