import { HttpClient } from '@angular/common/http';
import {Component} from '@angular/core'
import { RegistrResp } from '../registration/registration.component';
import { JWT } from '../jwt.service';

export interface Article {
    title: string,
    text: string,
    jwt?: string
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

    constructor(private http: HttpClient, private jwtService: JWT){

    }

    title: string = ''
    text: string = ''
    jwt: string = ''

    registrResp: RegistrResp = {
        error: '',
        hello: '',
        userLogin: '',
        jwt: '',
        article: '',
        added: ''
    };

    makeArticle(){
        this.jwtService.getExp();
        this.jwtService.isValid();
        if(localStorage.getItem('jwt')){
            const jwt: string | null = localStorage.getItem('jwt');
            const headers = { 'Authorization': 'Bearer ' + jwt}
            if (this.title.trim() && this.text.trim()){
                const article = {
                    title: this.title,
                    text: this.text,
                }
                this.http.post<RegistrResp>(
                    'http://127.0.0.1:8000/api/article/add', 
                    article, 
                    { headers }
                    ).subscribe( response => {
                        if(response) this.registrResp = response;
                    } );
            }
        }
    }

    clearArticle(){
        this.title = this.text = '';
    }

}