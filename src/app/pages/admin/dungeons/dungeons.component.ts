import { Component, OnInit } from '@angular/core';

import { Dungeon} from '../../../models/guild';
import { ZoneService } from '../../../services/zone.service';

@Component({
    selector: 'dungeons',
    templateUrl: './dungeons.component.html',
    styleUrls: ['./dungeons.component.css']
})

export class DungeonsComponent implements OnInit{
    
    dungeons: Dungeon[] = [];
    private enableAdd: boolean;
    addingLoot: string;
    addingMobCardId: string;
    addingWave: string[] = [];
    selectedDungeon = new Dungeon();
    
    constructor(private _zoneService: ZoneService){
        this.enableAdd = false;
    }

    toggleAdd(){
        if(this.enableAdd == false){
            this.enableAdd = true;
            this.selectedDungeon = new Dungeon();
        }
        else{
            this.enableAdd = false;
        }
    }

    async createDungeon(){
        await this._zoneService.createDungeon(this.selectedDungeon);
        this.dungeons = await this._zoneService.getDungeons();
        this.toggleAdd();
    }

    async updateDungeon(dungeon: Dungeon){
        await this._zoneService.updateDungeon(this.selectedDungeon);
        this.dungeons = await this._zoneService.getDungeons();
        this.toggleEdit(dungeon);
    }

    async deleteDungeon(dungeon: Dungeon){
        await this._zoneService.deleteDungeon(dungeon.dungeonId);
        this.dungeons = await this._zoneService.getDungeons();
    }

    async toggleEdit(dungeon: Dungeon){
        this.selectedDungeon = dungeon;
        if(dungeon.editMode == false || dungeon.editMode == null){
            dungeon.editMode = true;
        }
        else{
            dungeon.editMode = false;
        }
    }

    async ngOnInit() {
        this.dungeons = await this._zoneService.getDungeons();
    }

    addMobCard(mobCardId: String){
        this.addingWave.push(this.addingMobCardId);
    }

    addWave(){
        this.selectedDungeon.waves.push(this.addingWave)
    }

    addLoot(recipeId?: string){
        this.selectedDungeon.loot.push(recipeId);
    }

    onKey(input, targetProperty: string) {
        if(targetProperty=='name'){
            this.selectedDungeon.name = input;
        }else if(targetProperty=='zoneId'){
            this.selectedDungeon.zoneId = input;
        }else if(targetProperty=='difficultyRating'){
            this.selectedDungeon.difficultyRating = +input;
        }else if(targetProperty=='mobCardId'){
            this.addingMobCardId = input;
        }else if(targetProperty=='recipeId'){
            this.addingLoot = input;
        }
    }
}