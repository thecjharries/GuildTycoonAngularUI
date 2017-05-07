import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Guild, Team, Character, UpdateCharacterMessage } from '../models/guild'


@Injectable()
export class GuildService {
    private guild: Guild;

    // Observable navItem source
    private _selectedGuildSource = new BehaviorSubject<Guild>(new Guild());
    // Observable navItem stream
    selectedGuild$ = this._selectedGuildSource.asObservable();

    constructor(private apiService: ApiService) {
    }

    async selectGuild(guildId: string){
        var guild = await this.getGuild(guildId)
        this._selectedGuildSource.next(guild);
    }

    async getGuild(guildId: string){
        var params = new Map<string, string>();
        params.set("guildId", guildId);
        this.guild = await this.apiService.get('GetGuild', params);
        return this.guild;
    }

    async pullCharacterCard(guildId: string){
        var params = new Map<string, string>();
        params.set("guildId", guildId);
        this.guild = await this.apiService.get('PullCharacterCard', params);
        return this.guild;
    }

    async redeemCharacterCard(guildId: string, cardId: string){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        params.set('cardId', cardId);
        this.guild = await this.apiService.get('redeemCharacterCard', params);
        return this.guild;
    }

    getCurrentGuild(){
        return this.guild;
    }

    async equipItem(guildId: string, itemId: string, unitId: string){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        params.set('itemId', itemId);
        params.set('unitId', unitId);
        this.guild = await this.apiService.get('EquipItem', params);
        return this.guild;
    }

    async setTeam(guildId: string, teams: Team[]){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        this.guild = await this.apiService.post(JSON.stringify(teams), 'SetTeams', params);
        return this.guild;
    }

    async updateGuild(guildId:string, guild:Guild){
        var params = new Map<string,string>();
        params.set('guildId', guildId);
        this.guild = await this.apiService.post(JSON.stringify(guild), 'UpdateGuild', params);
        return this.guild;
    }

    async updateCharacter(guildId:string, character: Character){
        var updateCharacterMessage = new UpdateCharacterMessage();
        updateCharacterMessage.GuildId = guildId;
        updateCharacterMessage.Name = character.name;
        updateCharacterMessage.UnitId = character.unitId;
        updateCharacterMessage.Regimen = character.regimen;
        var params = new Map<string, string>();
        params.set("guildId", guildId);
        this.guild = await this.apiService.post(JSON.stringify(updateCharacterMessage), 'UpdateCharacter', params );
        return this.guild;
    }
}