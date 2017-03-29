import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Guild, Character, CharacterCard, Team } from './models/guild'

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
    selectedTeam: Team;

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

    async redeemCharacterCard(card: CharacterCard){
        this.guild = await this.guildService.redeemCharacterCard(this.guild.guildId, card.cardId);
    }

    selectTeam(id: number){
        var targetTeam = this.guild.teams.find(x => x.teamId == id);
        if (targetTeam != null){
            this.selectedTeam = this.guild.teams.find(x => x.teamId == id);
        }
        else{
            this.selectedTeam = new Team();
        }
        console.log(this.selectedTeam);
    }

    assignCharacter(character: Character, id: number){
        this.selectedTeam.units.set(id, character.unitId);
    }

    async setTeam(){
        var targetTeam = this.guild.teams.find(x => x.teamId == this.selectedTeam.teamId)
        console.log(targetTeam);
        if (targetTeam != null){
            this.guild.teams.find(x => x.teamId == this.selectedTeam.teamId).units = this.selectedTeam.units;
        }else{
            this.guild.teams.find(x => x.teamId == this.selectedTeam.teamId).units = new Map<number, string>();
            this.guild.teams.find(x => x.teamId == this.selectedTeam.teamId).units = this.selectedTeam.units;
        }
        console.log(this.guild.teams.find(x => x.teamId == this.selectedTeam.teamId).units);
        this.guild = await this.guildService.setTeam(this.guild.guildId, this.guild.teams);
    }

    async paramsChanged(id) {
        this.guild = await this.guildService.getGuild(id);
    }
}