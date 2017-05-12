import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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
    selectedZoneDungeons: Dungeon[] = [];
    guild = new Guild();
    guildSubscription: Subscription;
    constructor(private _zoneService: ZoneService, private _guildService: GuildService){
        this.zones = [];
    }

    async ngOnInit() {
        this.zones = await this._zoneService.getZones();
        this.guildSubscription = this._guildService.selectedGuild$.subscribe(guild => this.guild = guild);
        console.log(this.guild.teams);
    }

    ngOnDestroy() {
        this.guildSubscription.unsubscribe();
    }

    async setSelectedZone(zone: Zone){
        this.selectedZone = zone;
        this.selectedZoneDungeons = [];
        for(var dungeonId of this.selectedZone.dungeonIds){
            var dungeon = await this._zoneService.getDungeon(dungeonId);
            this.selectedZoneDungeons.push(dungeon);
        }
    }

    async attemptDungeon(teamId: number, dungeonId: number){
        await this._guildService.attemptDungeon(this.guild.guildId, teamId, dungeonId); 
    }
}