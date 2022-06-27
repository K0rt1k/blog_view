import { HttpClient } from "@angular/common/http"
import { Component, EventEmitter, Output, OnInit } from '@angular/core'
import { RequestService } from "../request.service";

export interface User {
  login: string,
  email?: string,
  password: string,
  role?: string
}

export interface RegistrResp {
  error?: string,
  hello?: string,
  userLogin?: string,
  jwt?: string,
  article?: string,
  added?: string,
  exp?: number
}

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor( private myRequest: RequestService ){

  }

  users: User[] = [
    {login: 'Ben', email: 'Ben@test.ts', password: '1234', role: 'regular'}
  ];

  registrResp: RegistrResp = {
    error: '',
    hello: '',
    userLogin: ''
  };

  login = '';
  email = '';
  password = '';
  role = 'regular';

  ngOnInit(){
    
  }

  addUser(){
    if (this.login.trim() && this.email.trim() && this.password.trim()){
      const user: User = {
        login: this.login,
        email: this.email,
        password: this.password,
        role: this.role
        
      }
      this.registrResp = this.myRequest.registrReq(user);
    }
    this.login = this.email = this.password = '';
  }

}