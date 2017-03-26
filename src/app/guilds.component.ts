import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Guild } from './models/guild'

import { GuildService } from './guild.service'

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'guilds',
    templateUrl: './guilds.component.html',
    styleUrls: ['./guilds.component.css']
})

export class GuildsComponent implements OnInit {
    guild = new Guild();
    sub;

    constructor(
        private guildService: GuildService,
        private route: ActivatedRoute,
        private location: Location
    ){ }

    ngOnInit(): void{
        this.sub = this.route.params.subscribe(params => {
            this.paramsChanged(params['id']);
        });
/*        console.log("initing");
        this.route.params
            .switchMap((params: Params) => this.guildService.getGuild(params['id']))
            .toPromise()
            .then(guild => this.guild = guild);*/
    }

    async pullCharacterCard(){
        this.guild = await this.guildService.pullCharacterCard(this.guild.guildId);
    }

    async paramsChanged(id) {
        this.guild = await this.guildService.getGuild(id);
    }
}