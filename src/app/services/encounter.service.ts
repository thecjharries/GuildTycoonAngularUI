import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { Guild, Team } from '../models/guild'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EncounterService {
    private guild: Guild;

    constructor(private apiService: ApiService) {
    }

    async dofight(){
        var params = new Map<string, string>();
        params.set("guildId", "bb78210b-600a-4dba-962d-3faba003de17");
        params.set("teamId", "1");
        this.guild = await this.apiService.get('dofight', params);
        return this.guild;
    }
}