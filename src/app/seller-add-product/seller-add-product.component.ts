import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productForSeller } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  productMessageAfterAdd:string|undefined;
    constructor(private product:ProductService){}
  ngOnInit(): void {

  }

  addProductSeller(data: productForSeller) {
    this.product.addProduct(data).subscribe(
      (result: any) => {
        console.log(result);
        if(result){
          this.productMessageAfterAdd="Product added Successfully!.."
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
