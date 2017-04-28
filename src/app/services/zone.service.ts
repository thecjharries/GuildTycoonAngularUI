import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';
import { serialize } from "serializer.ts/Serializer";

import { Zone, Dungeon, Guild } from '../models/guild';

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