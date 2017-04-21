import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';
import { Headers, Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { UserData } from '../models/user-data';

import { Token } from '../models/token';

import {FacebookService, FacebookInitParams, FacebookLoginResponse, FacebookAuthResponse} from 'ng2-facebook-sdk';
import {CookieService} from 'angular2-cookie/core';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class TokenService {
    token: Token;
    response;
    constructor(
        private fb: FacebookService, 
        private _apiService: ApiService,
        private jwtHelper: JwtHelper,
        private _cookieService: CookieService
    ) 
    {
        this.token = new Token;
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
        this.token.token = this._cookieService.get("id_token");
        if(this.token.token != null){
            return this.token.token;
        }
        else {
            await this.facebookLogin();
            var params = new Map<string, string>();
            params.set('accessToken', this.response.accessToken);
            var tokenResponse = await this._apiService.getNoAuth('GetToken', params);
            this.token.token = tokenResponse.token;
            this._cookieService.put("id_token", this.token.token);
            return this.token.token;
        }
    }

    decodeToken(token: string){
        return this.jwtHelper.decodeToken(token) as UserData;
    }

}