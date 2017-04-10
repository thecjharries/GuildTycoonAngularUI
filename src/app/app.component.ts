import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Headers, Http } from '@angular/http';
import { Token } from './models/token';
import { UserData } from './models/user-data'

import 'rxjs/add/operator/toPromise';

import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { EncounterService } from './encounter.service';
import { CookieService } from 'angular2-cookie/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Guild Tycoon';
  token: Token;
  loginStatus: boolean;
  expandGuildBool = false;
  userData: UserData;

  constructor(
      private tokenService: TokenService, 
      private apiService: ApiService,
      private encounterService: EncounterService, 
      private http: Http, 
      private _cookieService: CookieService
    ){
    this.userData = new UserData();
    this.token = new Token();
    this.token.token = this._cookieService.get("id_token"); 

    if (this.token.token != undefined){
      this.userData = this.tokenService.decodeToken(this.token.token);
      this.loginStatus = true;
    }   
    else {
      this.loginStatus = false;
    };
  };
  
  async testButton(){
    await this.encounterService.dofight();
  }

  async getToken(){
    this.token.token = await this.tokenService.getToken();
    this.userData = this.tokenService.decodeToken(this.token.token);
    if (this.token.token != null){
      this.loginStatus = true;
    };
  };

  expandGuild(){
    if (this.expandGuildBool == false){
      this.expandGuildBool = true;
    }
    else {
      this.expandGuildBool = false;
    }
  }
}




