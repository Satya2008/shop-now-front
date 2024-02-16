import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { productForSeller } from '../data-type';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<productForSeller[] | []>();
  constructor(private http: HttpClient) { }

 

  addProduct(data: productForSeller): Observable<any> {
    const sellerDataString: string | null = localStorage.getItem('seller');

    if (!sellerDataString) {
      console.error("Seller data not found in localStorage");
      return throwError("Seller data not found in localStorage");
    }

    const sellerData: any = JSON.parse(sellerDataString);
    const sellerId: number = sellerData.sellerId;
    // console.log(sellerId);

    return this.http.post(`https://shop-now-production.up.railway.app/seller/add/${sellerId}`, data);
  }


  getAllProducts() {
    const sellerDataString: string | null = localStorage.getItem('seller');

    if (!sellerDataString) {
      console.error("Seller data not found in localStorage");
      return throwError("Seller data not found in localStorage");
    }

    const sellerData: any = JSON.parse(sellerDataString);
    const sellerId: number = sellerData.sellerId;
    console.log("getting method get all products");

    return this.http.get<productForSeller[]>(`https://shop-now-production.up.railway.app/seller/${sellerId}/products`);
  }

  deleteProduct(productId: number) {
    const sellerDataString: string | null = localStorage.getItem('seller');

    if (!sellerDataString) {
      console.error("Seller data not found in localStorage");
      return throwError("Seller data not found in localStorage");
    }

    const sellerData: any = JSON.parse(sellerDataString);
    const sellerId: number = sellerData.sellerId;
    return this.http.delete(`https://shop-now-production.up.railway.app/seller/products/${productId}/seller/${sellerId}`)
  }

  getProduct(productId: string) {
    return this.http.get<productForSeller>(`https://shop-now-production.up.railway.app/seller/product/${productId}`)
  }

  updateProduct(data: productForSeller) {
    const sellerDataString: string | null = localStorage.getItem('seller');

    if (!sellerDataString) {
      console.error("Seller data not found in localStorage");
      return throwError("Seller data not found in localStorage");
    }

    const sellerData: any = JSON.parse(sellerDataString);
    const sellerId: number = sellerData.sellerId;
    return this.http.put<productForSeller>(`https://shop-now-production.up.railway.app/seller/products/${data.productId}/seller/${sellerId}`, data)
  }
  productForCarousel() {
    return this.http.get<productForSeller[]>(`https://shop-now-production.up.railway.app/seller/products/${3}`)
  }
  trendForHome() {
    return this.http.get<productForSeller[]>(`https://shop-now-production.up.railway.app/seller/products/${8}`)
  }
  searchQuery(query: string) {
    return this.http.get<productForSeller[]>(`https://shop-now-production.up.railway.app/seller/products/search/${query}`)
  }
  addTocartInLocalStorage(data: productForSeller) {
    let cartItem = []
    let localStorageData = localStorage.getItem('localStorageData')
    if (!localStorageData) {
      localStorage.setItem('localStorageData', JSON.stringify([data]))

    } else {
      cartItem = JSON.parse(localStorageData)
      cartItem.push(data)
      localStorage.setItem('localStorageData', JSON.stringify(cartItem))
      this.cartData.emit(cartItem)
    }
   
  }
  addToCart(cartData: productForSeller) {
    let userData = localStorage.getItem('user');
    let parsedData = userData && JSON.parse(userData);
   
   
    // let userId = JSON.parse(userData)
    return this.http.get<productForSeller>(`https://shop-now-production.up.railway.app/user/addProductToCart/${cartData.productId}/${parsedData.body.userId}`)
  }

  removeProductToCart(productId: number) {
    let cartData = localStorage.getItem("localStorageData");
    if (cartData) {
      let data: productForSeller[] = JSON.parse(cartData);
      data = data.filter((i: productForSeller) => {
        productId != i.productId
      })
      localStorage.setItem('localStorageData', JSON.stringify(data));

      this.cartData.emit(data);
    }


  }


  getCartList(userId: number) {
   
    return this.http.get<productForSeller[]>(`https://shop-now-production.up.railway.app/user/getAllProduct/${userId}`,{observe:"response"})
    .subscribe((res)=>{
      if(res && res.body){
        this.cartData.emit(res.body);
      }
     
    })
    
  }
  cartList(){
    let localData = localStorage.getItem('user');
    let userId = localData && JSON.parse(localData).body.userId;
    // console.log(userId)
    return this.http.get<productForSeller[]>(`https://shop-now-production.up.railway.app/user/getAllProduct/${userId}`)
   
  }

}

