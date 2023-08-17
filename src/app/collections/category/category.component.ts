import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  category!: Category;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nftId = params.get('id');
      this.api.getCategory(nftId).subscribe(categoryData => {
        this.category = categoryData;
      });
    });
    window.scrollTo(0, 0);
  }

  getBorderClass(index: number): string {
    const classes = ['border1', 'border2', 'border3'];
    return classes[index % classes.length];
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
  ];
}
