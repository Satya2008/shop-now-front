import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productForSeller } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
   cartData:productForSeller[]|undefined
  constructor(private product:ProductService){}
  ngOnInit(): void {
  
   this.product.cartList().subscribe((res)=>{
    console.log(res)
    this.cartData = res
   })
    
  }

}
