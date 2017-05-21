import { Component, OnInit, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Headers, Http } from '@angular/http';
import { Token } from './models/token';
import { UserData } from './models/user-data'
import { Guild } from './models/guild';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/toPromise';

import { TokenService } from './services/token.service';
import { CookieService } from 'angular2-cookie/core';
import { UserService } from './services/user.service';
import { GuildService } from './services/guild.service';

declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Guild Tycoon';
  guild = new Guild();
  token = new Token();
  loginStatus: boolean;
  expandGuildBool = false;
  userData = new UserData();
  guildSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
      private tokenService: TokenService, 
      private _userService: UserService,
      private _guildService: GuildService,
      private http: Http, 
      private _cookieService: CookieService,
      private element: ElementRef
    ){
      this.token.token = this._cookieService.get("id_token"); 

      if (this.token.token != undefined){
        // this.userData = this.tokenService.decodeToken(this.token.token);
        this.loginStatus = true;
      }   
      else {
        this.loginStatus = false;
      };
    };
  
  async ngOnInit() {
      this.userSubscription = this._userService.userData$.subscribe(userData => this.userData = userData);
      await this._userService.getUser();
      this.guildSubscription = this._guildService.selectedGuild$.subscribe(guild => this.guild = guild);
      // this.googleInit();
  }

  ngOnDestroy() {
      this.guildSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
  }

  async getToken(){
    this.token.token = await this.tokenService.getToken();
    console.log(this.token.token);
    await this._userService.getUser();
    console.log(this.userData);
    if (this.token.token != null){
      this.loginStatus = true;
      // this.userData = this.tokenService.decodeToken(this.token.token);
      if(this.loginStatus){
        await this._userService.getUser();
        // this.getUserGuildInfo();
      }
    };
  };

  async selectGuild(guildId: string){
    await this._guildService.selectGuild(guildId);
  }

  // public auth2: any;
  // public googleInit() {
  //   let that = this;
  //   gapi.load('auth2', function () {
  //     that.auth2 = this.gapi.auth2.init({
  //       client_id: '605026831411-ekof4g92ou4iqp9b254nor6eph9v6bce.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //       scope: 'profile email'
  //     });
  //     that.attachSignin(document.getElementById('googleBtn'));
  //   });
  // }

  // public attachSignin(element) {
  //   let that = this;
  //   this.auth2.attachClickHandler(element, {},
  //     function (googleUser) {

  //       let profile = googleUser.getBasicProfile();
  //       console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //       console.log('ID: ' + profile.getId());
  //       console.log('Name: ' + profile.getName());
  //       console.log('Image URL: ' + profile.getImageUrl());
  //       console.log('Email: ' + profile.getEmail());
  //       //YOUR CODE HERE


  //     }, function (error) {
  //       alert(JSON.stringify(error, undefined, 2));
  //     });
  // }
}




