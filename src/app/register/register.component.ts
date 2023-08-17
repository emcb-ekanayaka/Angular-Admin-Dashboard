import { Component, OnInit } from '@angular/core';
import { RegisterRepresentation } from '../service/api/modules/register-representation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  signUpUsers:any[] = [];
  signUpObject:RegisterRepresentation={};

  constructor(){}

  ngOnInit():void{

  }

  onSignUp():void{
    this.signUpUsers.push(this.signUpObject);
    localStorage.setItem('signupusers', JSON.stringify(this.signUpUsers));
    this.signUpObject={};
  }
}
