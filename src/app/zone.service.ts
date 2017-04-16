import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { Zone, Dungeon } from './models/guild'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ZoneService {
    zones: Zone[];
    dungeon: Dungeon;
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
 
    
}