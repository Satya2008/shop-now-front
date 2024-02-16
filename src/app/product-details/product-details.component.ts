import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productForSeller } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productAfterSearching: productForSeller | undefined
  productQuantity: number = 1
  removeCart = false
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId')
    //  console.log(productId)
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productAfterSearching = data
    })

    let cartData = localStorage.getItem("localStorageData")
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((i: productForSeller) => productId == i.productId.toString())
      if (items.length) {
        this.removeCart = true
      } else {
        this.removeCart = false
      }
    }
    // let user = localStorage.getItem('user')
    // if(user){
    //   let userId = JSON.parse(user).body.userId;
    //   this.product.getCartList(userId)
    //   this.product.cartData.subscribe((res)=>{
    //     res.filter((i:productForSeller)=>{
    //       productId
    //     })
    //   })
    // }
  }
  quantity(sign: string) {
    if (this.productQuantity < 10 && sign == 'plus') {
      this.productQuantity = this.productQuantity + 1
    }
    else if (this.productQuantity > 1 && sign == "minus") {
      this.productQuantity = this.productQuantity - 1
    }
  }
  addToCart() {

    if (this.productAfterSearching) {
      this.productAfterSearching.productQuantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        this.product.addTocartInLocalStorage(this.productAfterSearching)
        this.removeCart = true
      } else {
        //     // console.warn("user is log");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).body.userId;
        //     // console.log(this.productAfterSearching)
        //     // console.log(userId)
        let cartData = {
          ...this.productAfterSearching,
          userId

        }
        //       // console.log(cartData)\
        this.product.addToCart(this.productAfterSearching).subscribe((res) => {
          //         console.log(res);
          if (res) {
        this.product.getCartList(userId)
        this.removeCart = true
          }
          alert("product added in cart")
        })
      }
      //     // console.log(this.productAfterSearching)
    }
  }
  removeToCart(productId: number) {
    this.product.removeProductToCart(productId)
  }

}
