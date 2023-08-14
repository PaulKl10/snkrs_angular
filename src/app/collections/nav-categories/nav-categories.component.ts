import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-nav-categories',
  templateUrl: './nav-categories.component.html',
  styleUrls: ['./nav-categories.component.css']
})
export class NavCategoriesComponent {
  categories!: Category[];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCategories().subscribe(categoryData => {
      this.categories = categoryData;
      console.log(this.categories);
    });
  }
}

interface Category {
  id: number;
  name: string;
  description: string;
  nfts: [
    {
      id: number;
      name: string;
      img: string;
      nftPrice: {
        price_date: Date;
        price_eth_value: number;
      };
      stock: number;
    }
  ]
}
