import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
   allMenu = 'default'
   sellerName = '';
   userName=''
  // menuOpen = false
  cartItems = 0
  constructor(private route: Router, private product:ProductService){}
  ngOnInit(): void {
  this.route.events.subscribe((data:any)=>{
    // console.log(data.url)
    if(data.url){
      if(localStorage.getItem('seller') && data.url.includes('seller')){
        // console.log(data.url)
      this.allMenu ='seller'
       let sellerDataInJson = localStorage.getItem('seller');
       let sellerData = sellerDataInJson && JSON.parse(sellerDataInJson);
       this.sellerName = sellerData.name;
      //  console.log(this.sellerName)
      }else if(localStorage.getItem("user")){
      let user = localStorage.getItem("user");
      let userData = user && JSON.parse(user)
      this.userName = userData.name
      this.allMenu="user"  
    }
      else{
        this.allMenu='default'
      }
    }
  });
 

 let cartData =localStorage.getItem('localStorageData')
 if(cartData){
  this.cartItems=JSON.parse(cartData).length
 }
  this.product.cartData.subscribe((items)=>{
    this.cartItems=items.length
  })



}
sellerLogout(){
  localStorage.removeItem('seller')
  this.route.navigate(['/'])
}
userLogOut(){
  localStorage.removeItem('user')
  this.route.navigate(['/user-authentication'])
}
// toggleMenu(): void {
//   this.menuOpen = !this.menuOpen;
// }
submitSearch(query:string){
// console.log(query)\
this.route.navigate([`search/${query}`])
}


}

