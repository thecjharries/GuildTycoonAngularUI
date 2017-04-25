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
import { DashboardComponent }   from './pages/dashboard/dashboard.component';
import { GuildsComponent } from './pages/guilds/guilds.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { ZonesComponent } from './pages/zones/zones.component';
import { MapToIterablePipe, TimeRemainingPipe, VitToHpPipe } from './custom.pipes';

import { AdminComponent } from './pages/admin/admin.component';
import { CharacterCardsComponent } from './pages/admin/character_cards/character-cards.component';
import { MobCardsComponent } from './pages/admin/mob_cards/mob-cards.component';

import { ApiService } from './services/api.service';
import { GuildService } from './services/guild.service';
import { EncounterService } from  './services/encounter.service';
import { RegimenService } from './services/regimen.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/token.service';
import { ZoneService } from './services/zone.service';
import { CharacterCardsService } from './services/character-cards.service';
import { MobCardsService } from './services/mob-cards.service';

@NgModule({
  declarations: [ AppComponent,
                  DashboardComponent,
                  GuildsComponent,
                  CharactersComponent,
                  ZonesComponent,
                  AdminComponent,
                  CharacterCardsComponent,
                  MobCardsComponent,
                  MapToIterablePipe,
                  TimeRemainingPipe,
                  VitToHpPipe ],

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
               TokenService,
               ZoneService,
               CharacterCardsService,
               MobCardsService ],

  bootstrap: [ AppComponent ]
})

export class AppModule {}
