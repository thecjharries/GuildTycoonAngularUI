import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsComponent } from './teams.component';

import { GuildService } from '../../services/guild.service';
import { TeamsService } from './teams.service';

@NgModule({

  imports:      [ CommonModule ],

  declarations: [ TeamsComponent ],

  exports:      [ TeamsComponent ],
  
  providers:    [ GuildService, TeamsService ]

})

export class TeamsModule{}