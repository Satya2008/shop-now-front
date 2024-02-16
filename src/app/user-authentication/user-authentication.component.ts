import { Component, OnInit } from '@angular/core';
import {  loginForUser, productForSeller, userData } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.css']
})
export class UserAuthenticationComponent implements OnInit {
  showLogin: boolean = true
  errorMessage:string=''
  constructor(private user: UserService, private product:ProductService) { }

  ngOnInit(): void {
    this.user.reloadUser();
  }

  singUp(data: userData) {
    this.user.singUp(data);
  }

  login(data: loginForUser) {
    this.user.login(data);
    console.log("user logged in ")
    
    
    this.user.invalidUser.subscribe((res) => {
      if (res) {
        this.errorMessage = "Please enter valid credentials";
      } else {
        this.localCartToDatabase();
        // let userData = localStorage.getItem('user');
        // let userId = userData && JSON.parse(userData).userId;
        // if (userId) {
        //   this.product.getCartList(userId).subscribe((res) => {
        //     // Handle successful retrieval of cart items
        //   });
        //   this.localCartToDatabase();
        // }
      }
    });
  }

  openLogIn() {
    this.showLogin = true
    console.log("click")
  }
  openSignUp() {
  
    this.showLogin = false
  }


 
  localCartToDatabase() {
    let userData = localStorage.getItem('user');
    // console.log('userData:', userData);
    let localData = localStorage.getItem('localStorageData');
    let userId = userData && JSON.parse(userData).body.userId;
    console.log(userId);
    if (localData) {
    
     
  
      let localCartData: productForSeller[] = JSON.parse(localData);
  
      localCartData.forEach((item: productForSeller) => {
        let cartData: productForSeller = {
          ...item,
          productId: item.productId,
          userId: userId,
        };
  
        this.product.addToCart(cartData).subscribe((res) => {
          if (res) {
            console.warn("Adding local data");
          }
        });
      });
  
      localStorage.removeItem("localStorageData"); 
    } else {
      console.error("User data or userId is missing or null in local storage.");
    }

    this.product.getCartList(userId)
  }

}

