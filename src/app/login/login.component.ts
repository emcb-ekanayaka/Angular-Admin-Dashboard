import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRepresentation } from '../service/api/modules/login-representation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  signUpUsers:any[] = [];
  signIpObject:LoginRepresentation={};
  constructor(private router: Router){
  }
  

  ngOnInit():void{
    const localData = localStorage.getItem('signupusers');
    if(localData!=null){
      this.signUpUsers=JSON.parse(localData);
    }
  }

  onSignIn():void{
    const isUserExist = this.signUpUsers.find(m=>m.username==this.signIpObject.username && m.password==this.signIpObject.password);
    if(isUserExist!=undefined){
      alert("Successfully Loged In...!");
      this.router.navigateByUrl("dashboard")
    }else{
      alert("User Credentials Error...!");
    }
  }
}
