import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { SingUpForSeller, loginForSeller } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  
  isSellerLoggedin = new BehaviorSubject<boolean>(false) 
  constructor(private http: HttpClient, private router: Router) { }
sellerSignUp(data:SingUpForSeller){
   this.http.post('https://shop-now-production.up.railway.app/seller/', data, {
    observe : "response"
  }).subscribe((result)=>{
    alert("singup successfully!..")
    this.isSellerLoggedin.next(true)
    localStorage.setItem('seller', JSON.stringify(result.body))
    this.router.navigate(['seller-home'])
    // console.warn('result', result)
  })

}
reloadSeller(){
  if(localStorage.getItem('seller')){
    this.isSellerLoggedin.next(true)
    this.router.navigate(['seller-home'])
  }
}



errorDuringLogin = new EventEmitter<boolean>(false)


sellerLogin(data: loginForSeller) {
  this.http.get(`https://shop-now-production.up.railway.app/seller/login/${data.email}/${data.password}`, 
  { observe: 'response' }).subscribe({
    next: (response: any) => {
      if (response.status === 200) {
        alert("login successful");
        localStorage.setItem('seller', JSON.stringify(response.body));
        this.router.navigate(['seller-home']);
      } 
    },
    error: () => {
     
     this.errorDuringLogin.emit(true)
     
    }
  });
}



}
