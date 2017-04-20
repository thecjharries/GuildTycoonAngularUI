import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Guild, Character, CharacterCard, Team } from '../../models/guild';

import { GuildService } from '../../services/guild.service';
import { ZoneService } from '../../services/zone.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'guilds',
    templateUrl: './guilds.component.html',
    styleUrls: ['./guilds.component.css']
})

export class GuildsComponent implements OnInit, OnDestroy {
    guild = new Guild();
    editMode = false;
    date: number;
    timeRemaining: number;
    timerId;
    sub;
    selectedTeam: Team;
    selectedTeamCharacters: Character[];
    selectedCharacter: Character;

    constructor(
        private guildService: GuildService,
        private _zoneService: ZoneService,
        private route: ActivatedRoute,
        private location: Location
    )
    {
        this.selectedTeamCharacters = [];
        this.date = (new Date()).valueOf();
    }
  
    updateDate() {
        var now = (new Date()).valueOf();
        var end = (new Date(this.selectedTeam.primaryActionFinish)).valueOf();
        this.timeRemaining = Math.floor((end-now) / 1000);
    }
    
    ngOnDestroy() {
        clearInterval(this.timerId)
    }

    ngOnInit(): void{
        this.sub = this.route.params.subscribe(params => {
            this.paramsChanged(params['id']);
        });
        this.timerId = setInterval(() => this.updateDate(), 1000);
    }

    async pullCharacterCard(){
        this.guild = await this.guildService.pullCharacterCard(this.guild.guildId);
    }

    async redeemCharacterCard(card: CharacterCard){
        this.guild = await this.guildService.redeemCharacterCard(this.guild.guildId, card.cardId);
    }

    selectTeam(teamId: number){
        var targetTeam = this.guild.teams.find(x => x.teamId == teamId);
        if (targetTeam == null){
            this.selectedTeam = new Team(teamId);
        }
        else{
            this.selectedTeam = targetTeam;
        }
       this.rebuildTeam();
    }

    assignCharacter(character: Character, slotId: number){
        if(character == null){
            this.selectedTeam.units[slotId] = "00000000-0000-0000-0000-000000000000";
        }
        else{
            this.selectedTeam.units[slotId] = character.unitId;
        }
        this.rebuildTeam();
    }

    async setTeam(){

        if (this.guild.teams[this.selectedTeam.teamId - 1] == null){
            this.guild.teams[this.selectedTeam.teamId - 1] = new Team(this.selectedTeam.teamId);
            this.guild.teams[this.selectedTeam.teamId - 1].units = this.selectedTeam.units;
        }else{
            this.guild.teams[this.selectedTeam.teamId - 1].units = this.selectedTeam.units;
        }
        this.guild = await this.guildService.setTeam(this.guild.guildId, this.guild.teams);
    }

    async paramsChanged(id) {
        this.guild = await this.guildService.getGuild(id);
        this.selectedTeam = this.guild.teams[0];
    }

    onKey(name: string) {
        this.guild.name = name;
    }

    onKeyCharacter(characterName: string) {
        this.selectedCharacter.name = characterName;
    }

    async completeDungeon(teamId:number){
        this.guild = await this._zoneService.completeDungeon(this.guild.guildId, teamId);
    }
    
    async editModeToggle(){
        if (this.editMode == false){
            this.editMode = true;
        }
        else{
            this.editMode = false;
            await this.guildService.updateGuild(this.guild.guildId, this.guild);
        }
    }

    async editModeToggleCharacter(unitId: string){
        this.selectedCharacter = this.guild.characters.find(x => x.unitId == unitId);
        if(this.selectedCharacter.editMode == null){
            this.selectedCharacter.editMode = false;
        }
        if (this.selectedCharacter.editMode == false){
            this.selectedCharacter.editMode = true;
        }
        else{
            this.selectedCharacter.editMode = false;
            await this.guildService.updateCharacter(this.guild.guildId, this.selectedCharacter);
        }
    }

    rebuildTeam(){
        this.selectedTeamCharacters = []
        for(var i=1;i<=Object.keys(this.selectedTeam.units).length;i++){
            this.selectedTeamCharacters[i]= this.guild.characters.find(x => x.unitId == this.selectedTeam.units[i]);
        }
    }
}


function map_to_object(map) {
    const out = Object.create(null)
    map.forEach((value, key) => {
        if (value instanceof Map) {
        out[key] = map_to_object(value)
        }
        else {
        out[key] = value
        }
    })
    return out
}