import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SingUpForSeller, loginForSeller } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService, private router : Router){}
  
  ngOnInit():void{
    
    this.seller.reloadSeller()
  }
 signUp(data:SingUpForSeller):void{

  this.seller.sellerSignUp(data)
 }


 errorDuringAuthentication:string =''; 
 login(data:loginForSeller):void{
  this.errorDuringAuthentication=''
  this.seller.sellerLogin(data)
  this.seller.errorDuringLogin.subscribe((error)=>{
    if(error) this.errorDuringAuthentication = "Email or password is wrong"
  })
    

  }
  


 showLogin = true
 openLogin(){
  this.showLogin = true
 }
 openSignUp(){
  this.showLogin = false
 }
}
