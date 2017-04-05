import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { Guild, Team } from './models/guild'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GuildService {
    private guild: Guild;

    constructor(private apiService: ApiService) {
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
        console.log(teams);
        console.log(JSON.stringify(teams));
        this.guild = await this.apiService.post(JSON.stringify(teams), 'SetTeams', params);
        return this.guild;
    }
}