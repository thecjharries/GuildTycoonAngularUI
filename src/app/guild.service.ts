import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GuildService {
    private guild;

    constructor(private apiService: ApiService) {
    }

    async getGuild(id: string){
        var parameters = ["guildId"];
        var values = [id];
        this.guild = await this.apiService.get('GetGuild', parameters, values);
        console.log(this.guild);
        return this.guild;
    }

    updateGuild(guild){
        return this.guild = guild;
    }
}
