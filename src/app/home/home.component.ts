import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productForSeller } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carouselProduct: productForSeller[] | undefined;
  trendProductForHome : productForSeller[] |undefined
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.productForCarousel().subscribe((data) => {
      // console.log(data)
      this.carouselProduct = data;
    });
    this.product.trendForHome().subscribe((data) => {
      // console.log(data)
      this.trendProductForHome = data;
    });
  }
}

