import { Injectable }        from '@angular/core';
import { Subscription }                         from 'rxjs/Subscription';
import { BehaviorSubject }                      from 'rxjs/BehaviorSubject';

import { Guild, Team, Character }               from '../../models/guild';

import { GuildService }                         from '../../services/guild.service';

@Injectable()
export class TeamsService{
    guild = new Guild();

    guildSubscription: Subscription;
    
    
    // Observable navItem source
    private _teamSource = new BehaviorSubject<Team>(new Team());
    // Observable navItem stream
    team$ = this._teamSource.asObservable();

    private _teamCharactersSource = new BehaviorSubject<Character[]>([]);
    teamCharacters$ = this._teamCharactersSource.asObservable();

    constructor(private _guildService: GuildService){
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.guildSubscription = this._guildService.selectedGuild$.subscribe(guild => {
            this.guild = guild;
            if(this.guild.teams[0] == undefined){
                this.guild.teams[0] = new Team(1);
                this._teamSource.next(this.guild.teams[0]);
            }

            //Not related to above if statement
            if (this.guild.guildId != undefined && this._teamSource.value.teamId != null){
                this._teamSource.next(this.guild.teams[this._teamSource.value.teamId - 1]);
                this.selectTeamCharacters();
            }
            else{
                this._teamSource.next(this.guild.teams[0]);
                this.selectTeamCharacters();
            }
        });
    }

    assignCharacter(character: Character, slotId: number){
        if(character == null){
            this._teamSource.value.units[slotId] = "00000000-0000-0000-0000-000000000000";
            this._teamSource.next(this._teamSource.value);
        }
        else{
            this._teamSource.value.units[slotId] = character.unitId;
            this._teamSource.next(this._teamSource.value);
        }
        this.selectTeamCharacters();
    }
    
    selectTeam(teamId: number){
        var targetTeam = this.guild.teams.find(x => x.teamId == teamId);
        if (targetTeam == null){
            this._teamSource.next(new Team(teamId));
        }
        else{
            this._teamSource.next(targetTeam);
        }
       this.selectTeamCharacters();
    }


    selectTeamCharacters(){
        for(var i=1;i<=5;i++){
            var character = this.guild.characters.find(x => x.unitId == this._teamSource.value.units[i]);
            if(character != undefined){
                this._teamCharactersSource.value[i]= character;
            }
            else{
                this._teamCharactersSource.value[i] = null;
            }
        }
        this._teamCharactersSource.next(this._teamCharactersSource.value);
    }

    async saveTeam(){
        if (this.guild.teams[this._teamSource.value.teamId - 1] == null){
            this.guild.teams[this._teamSource.value.teamId - 1] = new Team(this._teamSource.value.teamId);
            this.guild.teams[this._teamSource.value.teamId - 1].units = this._teamSource.value.units;
            this.guild.teams[this._teamSource.value.teamId - 1].dungeonId = 0;
            this.guild.teams[this._teamSource.value.teamId - 1].actionType = 0;
            this.guild.teams[this._teamSource.value.teamId - 1].currentZone = "00000000-0000-0000-0000-000000000000";
            
        } else {
            this.guild.teams[this._teamSource.value.teamId - 1].units = this._teamSource.value.units;
        }

        await this._guildService.setTeam(this.guild.guildId, this.guild.teams);
    }
}
