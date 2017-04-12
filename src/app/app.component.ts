import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Headers, Http } from '@angular/http';
import { Token } from './models/token';
import { UserData } from './models/user-data'

import 'rxjs/add/operator/toPromise';

import { TokenService } from './token.service';
import { CookieService } from 'angular2-cookie/core';
import { UserService } from './user.service';


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
      private _userService: UserService,
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
  }

  async getToken(){
    this.token.token = await this.tokenService.getToken();
    if (this.token.token != null){
      this.loginStatus = true;
      this.userData = this.tokenService.decodeToken(this.token.token);
      this.getUserGuildInfo();
    };
  };

  expandGuild(){
    if (this.expandGuildBool == false){
      if(this.userData.guild1Name == null){
        this.getUserGuildInfo();
      }
      this.expandGuildBool = true;
    }
    else {
      this.expandGuildBool = false;
    }
  }

  async getUserGuildInfo(){
    var userGuildInfo = await this._userService.getUser();
    this.userData.guild1Id = userGuildInfo.guild1Id;
    this.userData.guild1Name = userGuildInfo.guild1Name;
    this.userData.guild2Id = userGuildInfo.guild2Id;
    this.userData.guild2Name = userGuildInfo.guild2Name;
    this.userData.guild3Id = userGuildInfo.guild3Id;
    this.userData.guild3Name = userGuildInfo.guild3Name;
    this.userData.guild4Id = userGuildInfo.guild4Id;
    this.userData.guild4Name = userGuildInfo.guild4Name;
    this.userData.guild5Id = userGuildInfo.guild5Id;
    this.userData.guild5Name = userGuildInfo.guild5Name;
  }
}




