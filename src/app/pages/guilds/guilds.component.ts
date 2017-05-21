import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { Guild, GuildHistory, Character, CharacterCard, Team } from '../../models/guild';
import { FightEvent, FightReceipt } from '../../models/receipts'

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
    guildHistories: GuildHistory[] = [];
    guildSubscription: Subscription;
    editMode = false;
    date: number;
    fightReceipt = new FightReceipt();
    
    timerId;
    sub;

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
        this.guildSubscription = this._guildService.selectedGuild$.subscribe(guild => this.guild = guild);
    }

    async pullCharacterCard(){
        await this._guildService.pullCharacterCard(this.guild.guildId);
    }

    async redeemCharacterCard(card: CharacterCard){
        await this._guildService.redeemCharacterCard(this.guild.guildId, card.cardId);
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

    async getGuildHistory(guildId: string){
        this.guildHistories = await this._guildService.getGuildHistory(guildId);
    }

    async viewReceipt(index: number, receiptType: string){
        console.log(index);
        console.log(receiptType);
        console.log(this.guildHistories[index]);
        if (receiptType == "Fight"){
           Object.assign(this.fightReceipt, JSON.parse(this.guildHistories[index].receipt));
        }
        console.log(this.fightReceipt);
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