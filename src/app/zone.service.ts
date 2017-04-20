import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { Zone, Dungeon, Guild } from './models/guild'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ZoneService {
    zones: Zone[];
    dungeon: Dungeon;
    guild: Guild;
    constructor(private _apiService: ApiService) {
    }

    async getZones(){
        this.zones =  await this._apiService.get('GetZone');
        return this.zones;
    }

    async getDungeon(dungeonId){
        var params = new Map<string, string>();
        params.set('dungeonId', dungeonId);
        this.dungeon =  await this._apiService.get('GetDungeon', params);
        return this.dungeon;
    }

    async sendTeam(guildId: string, teamId: number, dungeonId: number, zoneId: string){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        params.set('teamId', teamId.toString());
        params.set('dungeonId', dungeonId.toString());
        params.set('zoneId', zoneId);
        this.guild = await this._apiService.get('RunPseudoDungeon', params);
        return this.guild;
    }

    async completeDungeon(guildId: string, teamId: number){
        var params = new Map<string, string>();
        params.set('guildId', guildId);
        params.set('teamId', teamId.toString());
        this.guild = await this._apiService.get('CompletePseudoDungeon', params);
        return this.guild;
    }
 
    
}