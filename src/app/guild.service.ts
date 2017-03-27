import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { Guild } from './models/guild'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GuildService {
    private guild: Guild;

    constructor(private apiService: ApiService) {
    }

    async getGuild(guildId: string){
        var parameters = ["guildId"];
        var values = [guildId];
        this.guild = await this.apiService.get('GetGuild', parameters, values);
        return this.guild;
    }

    async pullCharacterCard(guildId: string){
        var parameters = ["guildId"];
        var values = [guildId];
        this.guild = await this.apiService.get('PullCharacterCard', parameters, values);
        return this.guild;
    }

    async redeemCharacterCard(guildId: string, cardId: string){
        var parameters = ['guildId', 'cardId'];
        var values = [guildId, cardId];
        this.guild = await this.apiService.get('redeemCharacterCard', parameters, values);
        return this.guild;
    }

    getCurrentGuild(){
        return this.guild;
    }

    updateGuild(guild){
        return this.guild = guild;
    }
}
