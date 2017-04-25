import { Component, OnInit } from '@angular/core';

import { Guild, Character, Item, RegimenAction, Regimen } from '../../models/guild';

import { GuildService } from '../../services/guild.service';
import { RegimenService } from '../../services/regimen.service';
import { EncounterService } from '../../services/encounter.service';

@Component({
    selector: 'characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.css'],
})

export class CharactersComponent implements OnInit {
    guild = new Guild();
    selectedCharacter = new Character();
    selectedCharacterEquipment = new Map<string, Item>();
    itemsForEquipmentSlot: Item[];
    itemSlotNames= new Map<string, string>();

    regimenActionProperties = [];
    regimenActionOperators = [];
    regimenActionTargets = [];
    regimenActionUsing = [];
    regimenAction: RegimenAction;

    targetValueArray = [];

    constructor(private _guildService: GuildService, private _regimenService: RegimenService, private _encounterService: EncounterService) {
        this.itemsForEquipmentSlot = []
        this.guild = _guildService.getCurrentGuild();
        this.generateSlotNamesMap();
    }


    async ngOnInit() {
        this.selectedCharacter = this.guild.characters[0];
        this.getEquipment(this.selectedCharacter);
        this.regimenAction = new RegimenAction();
        this.regimenActionProperties = await this._regimenService.getRegimenActionBlock("Property");
        this.regimenActionOperators = await this._regimenService.getRegimenActionBlock("Operator");
        this.regimenActionTargets = await this._regimenService.getRegimenActionBlock("Target");
        this.regimenActionUsing = await this._regimenService.getRegimenActionBlock("Using");
     }

     fight(){
        this._encounterService.dofight();
     }

    onSelect(character: Character): void {
        this.selectedCharacter = character;
        this.getEquipment(this.selectedCharacter);
    }

    getEquipment(character: Character){
        for ( let equipment in character.equipmentSheet){
            var value = this.guild.guildInventory.equippableItems.find(x => x.itemId == character.equipmentSheet[equipment]);
            this.selectedCharacterEquipment.set(equipment, value);
        }
    }

    getItemsForEquipmentSlot(slot: string){
        var searchTerm = '01-' + slot;
        this.itemsForEquipmentSlot = this.guild.guildInventory.equippableItems.filter(x => x.itemTypeId.startsWith(searchTerm));
    }

    async equipItem(item: Item){
        var slot = item.itemTypeId.split('-');
        this.selectedCharacter.equipmentSheet[slot[1]] = item.itemId;
        this.getEquipment(this.selectedCharacter);
        await this._guildService.equipItem(this.guild.guildId, item.itemId, this.selectedCharacter.unitId);
    }

    setRegimenActionTarget(target: string){
        this.regimenAction.target = target;
    }

    setRegimenActionTargetProperty(property: string){
        this.regimenAction.targetProperty = property;
        this.setTargetValueArray();
    }
    setRegimenActionTargetOperator(operator: string){
        this.regimenAction.targetOperator = operator;
        this.setTargetValueArray();
    }
    setRegimenActionTargetValue(value: number){
        this.regimenAction.targetValue = value.toString();
    }

    setRegimenActionUsing(using: string){
        this.regimenAction.usingSelection = using;
    }

    setTargetValueArray(){
        if(this.regimenAction.targetProperty.endsWith("Multiplier")){
            this.targetValueArray = this.generateArrayValues(35, 1);
        }
        else if(this.regimenAction.targetOperator.endsWith("Percent")){
            this.targetValueArray = this.generateArrayValues(100, 10);
        }
        else{
            this.targetValueArray = this.generateArrayValues(4000, 100);
        }
    }

    generateArrayValues(max: number, interval:number){
        var valueArray = [];
        for(var _i = 0; _i <= max; _i= _i + interval){
            valueArray.push(_i);
        }
        return valueArray;
    }
    
    generateSlotNamesMap(){
        this.itemSlotNames.set("01", "Main Hand");
        this.itemSlotNames.set("02", "Off-hand");
        this.itemSlotNames.set("03", "Head");
        this.itemSlotNames.set("04", "Neck");
        this.itemSlotNames.set("05", "Body");
        this.itemSlotNames.set("06", "Waist");
        this.itemSlotNames.set("07", "Legs");
        this.itemSlotNames.set("08", "Feet");
        this.itemSlotNames.set("09", "Right Finger");
        this.itemSlotNames.set("10", "Right Ear");
        this.itemSlotNames.set("11", "Left Finger");
        this.itemSlotNames.set("12", "Left Ear");
        this.itemSlotNames.set("13", "Ranged");
        this.itemSlotNames.set("14", "Ammo");
    }

    async addRegimenAction(){
        if(this.selectedCharacter.regimen == null){
            this.selectedCharacter.regimen = new Regimen();
        }
        this.selectedCharacter.regimen.regimenStack.push(this.regimenAction)
        this.regimenAction = new RegimenAction();
        await this._guildService.updateCharacter(this.guild.guildId, this.selectedCharacter);
    }

    async removeRegimenAction(index: number){
        this.selectedCharacter.regimen.regimenStack.splice(index, 1);
        await this._guildService.updateCharacter(this.guild.guildId, this.selectedCharacter);
    }

}