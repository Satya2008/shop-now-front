import { EventEmitter, Injectable } from '@angular/core';
import { loginForSeller, loginForUser, userData } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUser = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }

  singUp(data:userData){
    this.http.post(`https://shop-now-production.up.railway.app/user/registerUser`,data,{observe:"response"}).subscribe((result)=>{
      if(result){
        localStorage.setItem("user", JSON.stringify(result.body));
      this.router.navigate(['/']);
      }
    })
 
  }
  reloadUser(){
    if(localStorage.getItem('user')){
      
      this.router.navigate(['/'])
    }
  }

  login(data: loginForUser) {
    this.http.get<userData>(`https://shop-now-production.up.railway.app/user/login/${data.email}/${data.password}`, { observe: 'response' }).subscribe((res) => {
      if (res.body) { 
        
        localStorage.setItem("user", JSON.stringify(res)); 
        this.invalidUser.emit(false);
        this.router.navigate(['/']);
      } else {
        this.invalidUser.emit(true);
      }
    });
  }



}
