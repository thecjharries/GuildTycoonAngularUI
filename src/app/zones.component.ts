import { Component, OnInit } from '@angular/core';

import { UserData } from './models/user-data';
import { Zone, Dungeon } from './models/guild';
import { ZoneService } from './zone.service';

@Component({
    selector: 'zones',
    templateUrl: './zones.component.html',
    styleUrls: ['./zones.component.css']
})

export class ZonesComponent implements OnInit{
    zones: Zone[];
    selectedZone: Zone;
    selectedZoneDungeons: Dungeon[];
    constructor(private _zoneService: ZoneService){
        this.zones = [];
        this.selectedZoneDungeons = [];
    }
    async ngOnInit() {
        this.zones = await this._zoneService.getZones();
    }

    async setSelectedZone(zone: Zone){
        this.selectedZone = zone;
        for(var dungeonId of this.selectedZone.dungeonIds){
            var dungeon = await this._zoneService.getDungeon(dungeonId);
            this.selectedZoneDungeons.push(dungeon);
        }
    }
}