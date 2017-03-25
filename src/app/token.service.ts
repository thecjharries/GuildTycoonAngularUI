import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { UserData } from './models/user-data'

import { Token } from './models/token';

import {FacebookService, FacebookInitParams, FacebookLoginResponse, FacebookAuthResponse} from 'ng2-facebook-sdk';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TokenService {
    token: Token;
    response;
    private headers = new Headers({'Content-Type': 'application/json'});
    private heroesUrl = 'api/heroes';  // URL to web api

    constructor(private fb: FacebookService, private http: Http, private jwtHelper: JwtHelper) {
        let fbParams: FacebookInitParams = {
                                appId: '1550645341614134',
                                xfbml: true,
                                version: 'v2.6'
                                };
        this.fb.init(fbParams);
    }

    facebookLogin(){
        return this.fb.login().then(
            (fbResponse: FacebookLoginResponse) => this.response = fbResponse.authResponse,
            (error: any) => console.error(error)
        );
    }

    async getToken() {
        await this.facebookLogin();
        await this.http.get('http://guildtycoon-api-dev.azurewebsites.net/GetToken?accessToken=' + this.response.accessToken)
                    .toPromise().then(data => this.token = data.json());
        return this.token
    }

    decodeToken(token: string){
        return this.jwtHelper.decodeToken(token) as UserData;
    }

}
