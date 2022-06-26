import { HttpClient } from "@angular/common/http"
import { Component, EventEmitter, Output, OnInit } from '@angular/core'

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
    templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpClient){

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

      this.users.unshift(user)
      this.http.post<RegistrResp>('http://127.0.0.1:8000/api/user/registration', user)
      .subscribe( response => {
        if(response) this.registrResp = response;
      } );
    }
    this.login = this.email = this.password = '';
  }

}