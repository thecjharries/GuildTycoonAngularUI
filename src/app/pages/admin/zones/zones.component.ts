import { Component, OnInit } from '@angular/core';

import { Zone } from '../../../models/guild';
import { ZoneService } from '../../../services/zone.service';

@Component({
    selector: 'zones',
    templateUrl: './zones.component.html',
    styleUrls: ['./zones.component.css']
})

export class ZonesAdminComponent implements OnInit{
    
    private zones = [];
    private enableAdd: boolean;
    addingZone = new Zone();
    addingDungeonId: number;
    
    constructor(private _zoneService: ZoneService){
        this.enableAdd = false;
    }

    toggleAdd(){
        if(this.enableAdd == false){
            this.enableAdd = true;
        }
        else{
            this.enableAdd = false;
        }
    }

    async createZone(){
        await this._zoneService.createZone(this.addingZone);
        this.zones = await this._zoneService.getZones();
        this.toggleAdd();
    }

    async updateZone(zone: Zone){
        await this._zoneService.updateZone(zone);
        this.zones = await this._zoneService.getZones();
        this.toggleEdit(zone);
    }

    async deleteZone(zone: Zone){
        await this._zoneService.deleteZone(zone.ZoneId);
        this.zones = await this._zoneService.getZones();
    }

    async toggleEdit(zone: Zone){
        if(zone.EditMode == false || zone.EditMode == null){
            zone.EditMode = true;
        }
        else{
            zone.EditMode = false;
        }
    }

    async ngOnInit() {
        this.zones = await this._zoneService.getZones();
    }

    addDungeon(zone?: Zone){
        if(zone == null){
            this.addingZone.DungeonIds.push(this.addingDungeonId);
        }
        else{
            zone.DungeonIds.push(this.addingDungeonId);
        }
    }

    onKey(input, targetProperty: string, zone?: Zone) {
        if(zone != null){
            this.editSelectedProperty(input, targetProperty, zone);
        }
        else{
            this.editSelectedProperty(input, targetProperty, this.addingZone);
        }
        
    }

    editSelectedProperty(input, targetProperty, zone){
        if(targetProperty=='name'){
            zone.Name = input;
        }else if(targetProperty=='regionId'){
            zone.RegionId = input;
        }else if(targetProperty=='parentZoneId'){
            zone.ParentZoneId = input;
        }else if(targetProperty=='dungeonIds'){
            this.addingDungeonId = input;
        }else if(targetProperty=='mobCardIds'){
            zone.MobCardIds = input;
        }else if(targetProperty=='coordX'){
            zone.CoordX = input;
        }else if(targetProperty=='coordY'){
            zone.CoordY = input;
        }
    }
}