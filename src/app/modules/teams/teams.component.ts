import { Component, OnInit, OnDestroy }        from '@angular/core';
import { Subscription }                        from 'rxjs/Subscription';

import { Guild, Team, Character }              from '../../models/guild'; 

import { TeamsService }                        from './teams.service';
import { GuildService }                        from '../../services/guild.service';

@Component({
    selector: 'teams',
    templateUrl: './teams.component.html',
    styleUrls: [ './teams.component.css' ]
})

export class TeamsComponent implements OnInit, OnDestroy{
    team: Team;
    teamSubscription: Subscription;

    teamCharacters: Character[] = [];
    teamCharactersSubscription: Subscription;

    guild: Guild;
    guildSubscription: Subscription;

    constructor(private _teamsService: TeamsService, private _guildService: GuildService){

    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.teamSubscription = this._teamsService.team$.subscribe(team => { this.team = team} );
        this.teamCharactersSubscription = this._teamsService.teamCharacters$.subscribe(teamCharacters => this.teamCharacters = teamCharacters);
        this.guildSubscription = this._guildService.selectedGuild$.subscribe(guild => this.guild = guild);
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.teamSubscription.unsubscribe();
        this.teamCharactersSubscription.unsubscribe();
        this.guildSubscription.unsubscribe();
    }

    assignCharacter(character: Character, slotId: number){
        this._teamsService.assignCharacter(character, slotId);
    }

    createRange(number){
        var items: number[] = [];
        for(var i = 1; i <= number; i++){
            items.push(i);
        }
        return items;
    }

    saveTeam(){
        this._teamsService.saveTeam();
    }

    selectTeam(teamId: number){
        this._teamsService.selectTeam(teamId);
    }
}