import { Component, OnInit } from '@angular/core';
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
      private _cookieService: CookieService
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

  // expandGuild(){
  //   if (this.expandGuildBool == false){
  //     if(this.userData.guild1Name == null){
  //       this.getUserGuildInfo();
  //     }
  //     this.expandGuildBool = true;
  //   }
  //   else {
  //     this.expandGuildBool = false;
  //   }
  // }

//   async getUserGuildInfo(){
//     var userGuildInfo = await this._userService.getUser();
//     this.userData.guild1Id = userGuildInfo.guild1Id;
//     this.userData.guild1Name = userGuildInfo.guild1Name;
//     this.userData.guild2Id = userGuildInfo.guild2Id;
//     this.userData.guild2Name = userGuildInfo.guild2Name;
//     this.userData.guild3Id = userGuildInfo.guild3Id;
//     this.userData.guild3Name = userGuildInfo.guild3Name;
//     this.userData.guild4Id = userGuildInfo.guild4Id;
//     this.userData.guild4Name = userGuildInfo.guild4Name;
//     this.userData.guild5Id = userGuildInfo.guild5Id;
//     this.userData.guild5Name = userGuildInfo.guild5Name;
//   }
}




