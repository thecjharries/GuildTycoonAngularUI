import { Component, OnInit } from '@angular/core';

import { UserData } from '../../models/user-data';
import { Zone, Dungeon, Guild } from '../../models/guild';
import { ZoneService } from '../../services/zone.service';
import { GuildService } from '../../services/guild.service';

@Component({
    selector: 'zones',
    templateUrl: './zones.component.html',
    styleUrls: ['./zones.component.css']
})

export class ZonesComponent implements OnInit{
    zones: Zone[];
    selectedZone: Zone;
    selectedZoneDungeons: Dungeon[];
    guild = new Guild();
    constructor(private _zoneService: ZoneService, private _guildService: GuildService){
        this.zones = [];
        this.selectedZoneDungeons = [];
    }
    async ngOnInit() {
        this.zones = await this._zoneService.getZones();
        this.guild = await this._guildService.getCurrentGuild();
    }

    async setSelectedZone(zone: Zone){
        this.selectedZone = zone;
        for(var dungeonId of this.selectedZone.dungeonIds){
            var dungeon = await this._zoneService.getDungeon(dungeonId);
            this.selectedZoneDungeons.push(dungeon);
        }
    }

    async attemptDungeon(teamId: number, dungeonId: number){
        console.log(await this._zoneService.attemptDungeon(this.guild.guildId, teamId, dungeonId));
        
    }
}