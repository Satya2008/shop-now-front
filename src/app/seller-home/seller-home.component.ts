import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productForSeller } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  listOfProducts: productForSeller[] = [];
  deleteMessage:undefined|string;
  constructor(private product: ProductService){}


  ngOnInit(): void {
    this.product.getAllProducts().subscribe(
      (result: productForSeller[]) => {
        console.log(result);
        this.listOfProducts = result;
      }
    );
  }

  
  deleteProduct(productId:number){
  //  console.log(productId)
  this.product.deleteProduct(productId).subscribe((result)=>{
if(result){
this.deleteMessage = "Product Has been Deleted"
this.product.getAllProducts().subscribe(
  (result: productForSeller[]) => {
    console.log(result);
    this.listOfProducts = result;
  }
);

}
  })
  setTimeout(()=>{
    this.deleteMessage=undefined
  },5000)
  }

}
