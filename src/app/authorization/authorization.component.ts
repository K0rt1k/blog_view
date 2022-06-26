import { Component, OnInit } from '@angular/core';
import { User } from '../registration/registration.component';
import { JWT } from '../jwt.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(private jwtService: JWT) { }

  ngOnInit(): void {
  }

  login = '';
  password = '';

  unixTime: string = '';

  authorization(){
    if (this.login.trim() && this.password.trim()){
      const user: User = {
        login: this.login,
        password: this.password,
      }

      console.log(user);
      this.jwtService.getJWT(user);
      
    }
    // this.login = this.password = '';
  }

  showTime(){
    const nowDate = new Date();
    const unixTimeMSec = nowDate.getTime();
    const unixTime = Math.floor(Date.now() / 1000);
    this.unixTime = unixTime.toString();
  }

  showJWT(){
    console.log(localStorage.getItem('jwt'));
  }

  showExp(){
    console.log(localStorage.getItem('exp'));
  }

  deleteJwt(){
    localStorage.removeItem('jwt');
  }

  clear(){
    this.login = this.password = '';
  }

}
