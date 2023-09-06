import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
    userEmail: new FormControl('',[Validators.required]),    
    password: new FormControl('',[Validators.required, Validators.minLength(5)]),
  });


user:User = new User();

  constructor(private userService: UserServiceService,private router:Router) { }

  ngOnInit(): void {}

  userLogin(){
    this.userService.loginUser(this.user).subscribe( data => {
      console.log(data);
      this.userService.setToken(data);
      this.gotoHome();            
    }, error =>{
      alert("Please enter correct user name and password...! || You or not register");      
      console.log(error);
    })
  }

  gotoHome(){
    this.router.navigate(['/home']);
  }

  onsubmit(){ 
    this.userLogin();
    this.loginForm.reset();
  }
  
}
