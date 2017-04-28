import { Component, OnInit } from '@angular/core';

import { Zone } from '../../../models/guild';
import { ZoneService } from '../../../services/zone.service';

@Component({
    selector: 'zonesAdmin',
    templateUrl: './zones.component.html',
    styleUrls: ['./zones.component.css']
})

export class ZonesAdminComponent implements OnInit{
    
    private zones = [];
    private enableAdd: boolean;
    addingZone = new Zone();
    addingDungeonId: number;
    addingMobCardId: string;
    selectedZone = new Zone();
    
    constructor(private _zoneService: ZoneService){
        this.enableAdd = false;
    }

    toggleAdd(){
        if(this.enableAdd == false){
            this.enableAdd = true;
            this.selectedZone = new Zone();
        }
        else{
            this.enableAdd = false;
        }
    }

    async createZone(){
        await this._zoneService.createZone(this.selectedZone);
        this.zones = await this._zoneService.getZones();
        this.toggleAdd();
    }

    async updateZone(zone: Zone){
        await this._zoneService.updateZone(this.selectedZone);
        this.zones = await this._zoneService.getZones();
        this.toggleEdit(zone);
    }

    async deleteZone(zone: Zone){
        await this._zoneService.deleteZone(zone.zoneId);
        this.zones = await this._zoneService.getZones();
    }

    async toggleEdit(zone: Zone){
        this.selectedZone = zone;
        if(zone.editMode == false || zone.editMode == null){
            zone.editMode = true;
        }
        else{
            zone.editMode = false;
        }
    }

    async ngOnInit() {
        this.zones = await this._zoneService.getZones();
    }

    addDungeon(zone?: Zone){
        if(zone == null){
            this.selectedZone.dungeonIds.push(this.addingDungeonId);
        }
        else{
            zone.dungeonIds.push(this.addingDungeonId);
        }
    }

    addMobCard(zone?: Zone){
        if(zone == null){
            this.selectedZone.mobCardIds.push(this.addingMobCardId);
        }
        else{
            zone.mobCardIds.push(this.addingMobCardId);
        }
    }

    onKey(input, targetProperty: string, zone?: Zone) {
        if(zone != null){
            this.editSelectedProperty(input, targetProperty, zone);
        }
        else{
            this.editSelectedProperty(input, targetProperty, this.selectedZone);
        }
        
    }

    editSelectedProperty(input, targetProperty, zone){
        if(targetProperty=='name'){
            this.selectedZone.name = input;
        }else if(targetProperty=='regionId'){
            this.selectedZone.regionId = input;
        }else if(targetProperty=='parentZoneId'){
            this.selectedZone.parentZoneId = input;
        }else if(targetProperty=='dungeonId'){
            this.addingDungeonId = +input;
        }else if(targetProperty=='mobCardId'){
            this.addingMobCardId = input;
        }else if(targetProperty=='coordX'){
            this.selectedZone.coordX = input;
        }else if(targetProperty=='coordY'){
            this.selectedZone.coordY = input;
        }
    }
}