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

    constructor(private _apiService: ApiService) {
    }

    async selectGuild(guildId: string){
        this._selectedGuildSource.next(await this.getGuild(guildId));
    }

    async getGuild(guildId: string){
        var params = new Map<string, string>();
        params.set("guildId", guildId);
        return await this._apiService.get('GetGuild', params);
    }

    async pullCharacterCard(guildId: string){
        var params = new Map<string, string>();
        params.set("guildId", guildId);
        this._selectedGuildSource.next(await this._apiService.get('PullCharacterCard', params));
    }

    async redeemCharacterCard(guildId: string, cardId: string){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        params.set('cardId', cardId);
        this._selectedGuildSource.next(await this._apiService.get('redeemCharacterCard', params));
    }

    getCurrentGuild(){
        return this.guild;
    }

    async equipItem(guildId: string, itemId: string, unitId: string){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        params.set('itemId', itemId);
        params.set('unitId', unitId);
        this._selectedGuildSource.next(await this._apiService.get('EquipItem', params));
    }

    async setTeam(guildId: string, teams: Team[]){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        this._selectedGuildSource.next(await this._apiService.post(JSON.stringify(teams), 'SetTeams', params));
    }

    async updateGuild(guildId:string, guild:Guild){
        var params = new Map<string,string>();
        params.set('guildId', guildId);
        this._selectedGuildSource.next(await this._apiService.post(JSON.stringify(guild), 'UpdateGuild', params));
    }

    async updateCharacter(guildId:string, character: Character){
        var updateCharacterMessage = new UpdateCharacterMessage();
        updateCharacterMessage.GuildId = guildId;
        updateCharacterMessage.Name = character.name;
        updateCharacterMessage.UnitId = character.unitId;
        updateCharacterMessage.Regimen = character.regimen;
        var params = new Map<string, string>();
        params.set("guildId", guildId);
        this._selectedGuildSource.next(await this._apiService.post(JSON.stringify(updateCharacterMessage), 'UpdateCharacter', params ));
    }

    async attemptDungeon(guildId: string, teamId: number, dungeonId: number){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        params.set('teamId', teamId.toString());
        params.set('dungeonId', dungeonId.toString());
        this._selectedGuildSource.next(await this._apiService.get('AttemptDungeon', params));
    }

    async completeDungeon(guildId: string, teamId: number){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        params.set('teamId', teamId.toString());
        this._selectedGuildSource.next(await this._apiService.get('CompletePseudoDungeon', params));
    }
 
}