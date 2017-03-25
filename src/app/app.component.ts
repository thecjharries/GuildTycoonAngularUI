import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Headers, Http } from '@angular/http';
import { Token } from './models/token';
import { UserData } from './models/user-data'

import 'rxjs/add/operator/toPromise';

import { TokenService } from './token.service'
import { ApiService } from './api.service'


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

  constructor(private tokenService: TokenService, private apiService: ApiService, private http: Http){
    this.userData = new UserData();
    if (this.token == null){
      this.loginStatus = true;
    };
  };
  
  async testButton(){
    var parameters = ["guildId"];
    var values = [this.userData.chronicle3];
    console.log(await this.apiService.get('GetGuild', parameters, values));
  }

  async getToken(){
    this.token = await this.tokenService.getToken();
    this.userData = this.tokenService.decodeToken(this.token.token);
    if (this.token != null){
      this.loginStatus = false;
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




