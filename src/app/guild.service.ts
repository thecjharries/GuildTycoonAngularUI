import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { Guild } from './models/guild'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GuildService {
    private guild: Guild;

    constructor(private apiService: ApiService) {
    }

    async getGuild(id: string){
        var parameters = ["guildId"];
        var values = [id];
        this.guild = await this.apiService.get('GetGuild', parameters, values);
        return this.guild;
    }

    updateGuild(guild){
        return this.guild = guild;
    }
}
