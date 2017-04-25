import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';

import { Token } from '../models/token';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
    private token: Token;
    response;
    private headers = new Headers({'Content-Type': 'application/json'});
    /*private apiBase = 'http://guildtycoon-api-dev.azurewebsites.net/';  // URL to web api*/
    private apiBase = 'http://localhost:5000/';  // URL to web api*/

    constructor(private http: Http, private _cookieService: CookieService) {
        this.token = new Token();
    }

    async get(endpoint: string, parameters?: Map<string, string>){
        if(parameters != null){
            var stringParameters = '?';
            var index = 0;
            parameters.forEach((value: string, key: string) => {
                stringParameters = stringParameters + key + '=' + value;
                index++;
                if(index < parameters.size){
                    stringParameters = stringParameters + '&';
                }
            })
        }
        else{
            var stringParameters="";
        }
        if (!this.headers.has("Authorization")){
            var success = await this.createAuthorizationHeader(this.headers);
            this.headers.append('Access-Control-Allow-Origin','*');

            if (success){
                await this.http.get(this.apiBase + endpoint + stringParameters, {headers: this.headers})
                            .toPromise().then(data => this.response = data.json());
                
                return this.response;
            }
        }
        else{
            await this.http.get(this.apiBase + endpoint + stringParameters, {headers: this.headers})
                        .toPromise().then(data => this.response = data.json());
            
            return this.response;
        }
    }

    async getNoAuth(endpoint:string, parameters: Map<string,string>){
        if(parameters != null){
            var stringParameters = '?';
            var index = 0;
            parameters.forEach((value: string, key: string) => {
                stringParameters = stringParameters + key + '=' + value;
                index++;
                if(index < parameters.size){
                    stringParameters = stringParameters + '&';
                }
            })
        }
        // await this.http.get(this.apiBase + endpoint + stringParameters)
        //                .toPromise().then(data => this.response = data.json());
        this.response = await this.http.get(this.apiBase + endpoint + stringParameters, {headers: this.headers});
        return this.response;
    }

    async post(body: any, endpoint: string, parameters?: Map<string, string>){
        if(parameters != null){
            var stringParameters = '?';
            var index = 0;
            parameters.forEach((value: string, key: string) => {
                stringParameters = stringParameters + key + '=' + value;
                index++;
                if(index < parameters.size){
                    stringParameters = stringParameters + '&';
                }
            })
        }
        else{
            var stringParameters="";
        }
        if (!this.headers.has("Authorization")){
            var success = await this.createAuthorizationHeader(this.headers);
            if (success){
                await this.http.post(this.apiBase + endpoint + stringParameters, body, {headers: this.headers})
                            .toPromise().then(data => this.response = data.json());

                if(this.response != null){
                    return this.response;
                }
            }
        }
        else{
            await this.http.post(this.apiBase + endpoint + stringParameters, body, {headers: this.headers})
                        .toPromise().then(data => this.response = data.json());

            if(this.response != null){
                return this.response;
            }    
        }
    }

    async createAuthorizationHeader(headers: Headers) {
        this.token.token = this._cookieService.get('id_token');
        if(this.token.token != null){
            headers.append('Authorization', 'Bearer ' + this.token.token);
            return true; 
        }
        else {
            console.log("Error: missing user authentication token")
            return false;
        }
    }

    private handleError() {
        
    }
}