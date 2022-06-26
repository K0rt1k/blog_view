import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegistrResp, User } from './registration/registration.component';


@Injectable({providedIn: 'root'})
export class JWT {

    private expirationTime: number = 0;

    registrResp: RegistrResp = {
        error: '',
        hello: '',
        userLogin: '',
        jwt: '',
        exp: 0
      };

    constructor(private http: HttpClient) { }

    getJWT(user: User){
        this.http.post<RegistrResp>('http://127.0.0.1:8000/api/user/authorization', user)
      .subscribe( response => {
        console.log(response);
        if(response){ 
          this.registrResp = response;
          console.log(this.registrResp.jwt);
          console.log(this.registrResp.exp);
          if(this.registrResp.jwt && this.registrResp.exp) {
            localStorage.setItem('jwt', this.registrResp.jwt);
            localStorage.setItem('exp', this.registrResp.exp.toString());
            this.registrResp.jwt = '';
            this.registrResp.exp = 0;
          }
        }
      } );
    }

    getExp(): boolean {
      if(localStorage.getItem('exp')){
          const exp: number = Number(localStorage.getItem('exp'));
          if(typeof exp === 'number'){
            this.expirationTime = exp;
            return true;
          }
      }
      return false;
    }

    isValid(): boolean {
      if(this.getExp()){
        if(this.expirationTime){
            const unixTimeNow = Math.floor(Date.now() / 1000);
            if(this.expirationTime < unixTimeNow){
              return true;
            }
        }
      }
      return false;
    }
}

