import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FacebookService } from 'ng2-facebook-sdk';
import { JwtHelper } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { GuildsComponent } from './guilds.component';

import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { GuildService } from './guild.service'

@NgModule({
  declarations: [ AppComponent,
                  DashboardComponent,
                  GuildsComponent ],
  imports: [ 
    BrowserModule,
    AlertModule.forRoot(),
    HttpModule,
    AppRoutingModule
  ],
  providers: [ FacebookService,
               TokenService,
               JwtHelper,
               ApiService,
               GuildService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
