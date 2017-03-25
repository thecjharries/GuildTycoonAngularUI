import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { TokenService } from './token.service'

import { Token } from './models/token';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
    private token: Token;
    response;
    private headers = new Headers({'Content-Type': 'application/json'});
    private apiBase = 'http://guildtycoon-api-dev.azurewebsites.net/';  // URL to web api

    constructor(private http: Http, private tokenService: TokenService) {
        
    }

    async get(endpoint: string, parameters?: string[], values?: string[]){
        if(parameters != null){
            var stringParameters = '?';
            for (var i = 0; i < parameters.length; i++){
                stringParameters = stringParameters + parameters[i] + '=' + values[i];
                if(i < parameters.length - 1){
                    stringParameters = stringParameters + '&';
                }
            }
        }
        if (!this.headers.has("Authorization")){
            this.createAuthorizationHeader(this.headers);
        }
        await this.http.get(this.apiBase + endpoint + stringParameters, {headers: this.headers})
                    .toPromise().then(data => this.response = data.json());
        return this.response;
    }

    createAuthorizationHeader(headers: Headers) {
        if (this.token == null){
            this.token = this.tokenService.token;
        }
        if(this.token.token != null){
            headers.append('Authorization', 'Bearer ' + this.token.token); 
        }
        else {
            console.log("Token is null")
        }
    }
}