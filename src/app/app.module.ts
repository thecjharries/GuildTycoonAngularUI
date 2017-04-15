import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { FacebookService } from 'ng2-facebook-sdk';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { GuildsComponent } from './guilds.component';
import { CharactersComponent } from './characters.component'
import { MapToIterablePipe } from './mapToIterable.pipe'


import { ApiService } from './api.service';
import { GuildService } from './guild.service';
import { EncounterService } from  './encounter.service';
import { RegimenService } from './regimen.service';
import { UserService } from './user.service';
import { TokenService } from './token.service';

@NgModule({
  declarations: [ AppComponent,
                  DashboardComponent,
                  GuildsComponent,
                  CharactersComponent,
                  MapToIterablePipe ],

  imports: [ BrowserModule,
             AlertModule.forRoot(),
             HttpModule,
             AppRoutingModule ],

  providers: [ FacebookService,
               JwtHelper,
               CookieService,
               ApiService,
               GuildService,
               EncounterService,
               RegimenService,
               UserService,
               TokenService ],

  bootstrap: [ AppComponent ]
})

export class AppModule {}
