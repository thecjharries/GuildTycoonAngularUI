import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';
import { serialize } from "serializer.ts/Serializer";

import { Zone, Dungeon, Guild } from '../models/guild';

@Injectable()
export class ZoneService {
    zones: Zone[] = [];
    dungeons: Dungeon[] = [];
    dungeon: Dungeon;
    guild: Guild;
    constructor(private _apiService: ApiService) {
    }

    async getZones(){
        this.zones =  await this._apiService.get('GetZone');
        return this.zones;
    }

    async createZone(zone: Zone){
        await this._apiService.post(JSON.stringify(zone), 'CreateZone');
    }

    async updateZone(zone: Zone){
        await this._apiService.post(JSON.stringify(zone), 'UpdateZone');
    }

    async deleteZone(zoneId: string){
        var params = new Map<string, string>();
        params.set('zoneId', zoneId);
        await this._apiService.get('DeleteZone', params);
    }

    async getDungeon(dungeonId){
        var params = new Map<string, string>();
        params.set('dungeonId', dungeonId);
        this.dungeon =  await this._apiService.get('GetDungeon', params);
        return this.dungeon;
    }

    async getDungeons(){
        this.dungeons =  await this._apiService.get('GetDungeon');
        return this.dungeons;
    }

    async createDungeon(dungeon: Dungeon){
        await this._apiService.post(JSON.stringify(dungeon), 'CreateDungeon');
    }

    async updateDungeon(dungeon: Dungeon){
        await this._apiService.post(JSON.stringify(dungeon), 'UpdateDungeon');
    }

    async deleteDungeon(dungeonId: number){
        var params = new Map<string, string>();
        params.set('dungeonId', dungeonId.toString());
        await this._apiService.get('DeleteDungeon', params);
    }


    
}