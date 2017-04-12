import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'angular2-cookie/core';

import { Token } from './models/token';

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

    async get(endpoint: string, parameters: Map<string, string>){
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
            /*for (var i = 0; i < parameters.length; i++){
                stringParameters = stringParameters + parameters[i] + '=' + values[i];
                if(i < parameters.length - 1){
                    stringParameters = stringParameters + '&';
                }
            }*/
        }
        if (!this.headers.has("Authorization")){
            await this.createAuthorizationHeader(this.headers);
            this.headers.append('Access-Control-Allow-Origin','*');
        }
        await this.http.get(this.apiBase + endpoint + stringParameters, {headers: this.headers})
                       .toPromise().then(data => this.response = data.json());
        return this.response;
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
            /*for (var i = 0; i < parameters.length; i++){
                stringParameters = stringParameters + parameters[i] + '=' + values[i];
                if(i < parameters.length - 1){
                    stringParameters = stringParameters + '&';
                }
            }*/
        }
        await this.http.get(this.apiBase + endpoint + stringParameters)
                       .toPromise().then(data => this.response = data.json());
        return this.response;
    }

    async post(body: any, endpoint: string, parameters: Map<string, string>){
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
            /*for (var i = 0; i < parameters.length; i++){
                stringParameters = stringParameters + parameters[i] + '=' + values[i];
                if(i < parameters.length - 1){
                    stringParameters = stringParameters + '&';
                }
            }*/
        }
        if (!this.headers.has("Authorization")){
            await this.createAuthorizationHeader(this.headers);
        }
        await this.http.post(this.apiBase + endpoint + stringParameters, body, {headers: this.headers})
                       .toPromise().then(data => this.response = data.json());
        return this.response;
    }

    async createAuthorizationHeader(headers: Headers) {
        this.token.token = this._cookieService.get('id_token');
        if(this.token.token != null){
            headers.append('Authorization', 'Bearer ' + this.token.token); 
        }
        else {
            console.log("Error: missing user authentication token")
        }
    }
}