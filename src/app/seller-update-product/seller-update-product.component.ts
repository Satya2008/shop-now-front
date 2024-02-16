import { Component, OnInit } from '@angular/core';
import { productForSeller } from '../data-type';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  
  productData: productForSeller | undefined;
  productMessageAfterUpdate: string | undefined;
  
  constructor(private product: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.product.getProduct(productId).subscribe((data: productForSeller) => {
        // console.log(productId)
        this.productData = data;
      });
    }
  }
  
  updateProductSeller(data: productForSeller){

    // console.log(data)
    if(this.productData){
      data.productId = this.productData.productId;
    }
    this.product.updateProduct(data).subscribe(
      (result) => {
        if (result) {
          this.productMessageAfterUpdate = "Product updated Successfully!..";
        }
      }
    );
    setTimeout(() => {
      this.productMessageAfterUpdate = undefined;
    }, 5000);
 
  }
  
  
}
