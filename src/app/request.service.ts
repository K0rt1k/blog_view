import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegistrResp, User } from "./registration/registration.component";

@Injectable({providedIn: 'root'})
export class RequestService {

  registrResp: RegistrResp = {
    error: ''
  };

  constructor(private http: HttpClient){ }

  registrReq(user: User): RegistrResp {
      this.http.post<RegistrResp>(
        'http://127.0.0.1:8000/api/user/registration', user)
      .subscribe( { 
        next: response => {
          this.registrResp = response;
          return this.registrResp;
        },
        error: error => {
          this.registrResp.error = error.message;
          console.log(error.message);
          return this.registrResp;
        } 
      } );
    return this.registrResp;
  }

}