import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

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
    guildSubscription: Subscription;
    editMode = false;
    date: number;
    timerId;
    sub;
    selectedTeam: Team;
    selectedTeamCharacters: Character[] = [];
    selectedCharacter: Character;
    constructor(
        private _guildService: GuildService,
        private _zoneService: ZoneService,
        private route: ActivatedRoute,
        private location: Location
    )
    {
        this.date = (new Date()).valueOf();
    }
  
    updateDate() {
        var now = (new Date()).valueOf();
        for(let team of this.guild.teams){
            var end = (new Date(team.primaryActionFinish)).valueOf();
            team.timeRemaining = Math.floor((end-now)/1000)
        }
    }
    
    ngOnDestroy() {
        clearInterval(this.timerId);
        this.guildSubscription.unsubscribe();
    }

    ngOnInit(): void{
        this.timerId = setInterval(() => this.updateDate(), 1000);
        this.guildSubscription = this._guildService.selectedGuild$.subscribe(guild => {
            this.guild = guild;
            if(this.guild.guildId != undefined){
                this.selectedTeam = this.guild.teams[0];
                this.rebuildTeam();
            }
        });
    }


    // async paramsChanged(id) {

    // }
    async pullCharacterCard(){
        await this._guildService.pullCharacterCard(this.guild.guildId);
    }

    async redeemCharacterCard(card: CharacterCard){
        await this._guildService.redeemCharacterCard(this.guild.guildId, card.cardId);
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
        console.log(this.selectedTeam)
        console.log(slotId);
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
            this.guild.teams[this.selectedTeam.teamId - 1].dungeonId = 0;
            this.guild.teams[this.selectedTeam.teamId - 1].actionType = 0;
            this.guild.teams[this.selectedTeam.teamId - 1].currentZone = "00000000-0000-0000-0000-000000000000";
            
        }else{
            this.guild.teams[this.selectedTeam.teamId - 1].units = this.selectedTeam.units;
        }
        
        await this._guildService.setTeam(this.guild.guildId, this.guild.teams);
    }


    onKey(name: string) {
        this.guild.name = name;
    }

    onKeyCharacter(characterName: string) {
        this.selectedCharacter.name = characterName;
    }

    async completeDungeon(teamId:number){
        await this._guildService.completeDungeon(this.guild.guildId, teamId);
    }
    
    async editModeToggle(){
        if (this.editMode == false){
            this.editMode = true;
        }
        else{
            this.editMode = false;
            await this._guildService.updateGuild(this.guild.guildId, this.guild);
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
            await this._guildService.updateCharacter(this.guild.guildId, this.selectedCharacter);
        }
    }

    rebuildTeam(){
        this.selectedTeamCharacters = []
        for(var i=1;i<=Object.keys(this.selectedTeam.units).length;i++){
            this.selectedTeamCharacters[i]= this.guild.characters.find(x => x.unitId == this.selectedTeam.units[i]);
        }
    }

    createRange(number){
        var items: number[] = [];
        for(var i = 1; i <= number; i++){
            items.push(i);
        }
        return items;
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