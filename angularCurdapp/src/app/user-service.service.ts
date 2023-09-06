import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseURL = "http://localhost:8083/"

  constructor(private httpClient:HttpClient,private router:Router) { }

  loginUser(user:User):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`+`login`, user);
  }

  setToken(token:any){
    localStorage.setItem("token", token?.token);
    return true;
  }

  isloggedIn(){
    let token = localStorage.getItem("token");
    if (token === undefined || token === '' || token === null){
      return false;
    }
    else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(["login"]); 
  }

}
