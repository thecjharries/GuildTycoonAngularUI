import { Component, OnInit, Pipe } from '@angular/core';

import { Guild, Character, Item, RegimenAction, Regimen } from './models/guild';

import { GuildService } from './guild.service';
import { RegimenService } from './regimen.service';

@Component({
    selector: 'characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
    guild = new Guild();
    selectedCharacter = new Character();
    selectedCharacterEquipment = new Map<string, Item>();
    itemsForEquipmentSlot: Item[];

    regimenActionProperties = [];
    regimenActionOperators = [];
    regimenActionTargets = [];
    regimenActionUsing = [];
    regimenAction: RegimenAction;

    targetValueArray = [];

    constructor(private _guildService: GuildService, private _regimenService: RegimenService) {
        this.itemsForEquipmentSlot = []
        this.guild = _guildService.getCurrentGuild();
        
        console.log(this.guild.characters);
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
        this.regimenAction.Target = target;
    }

    setRegimenActionTargetProperty(property: string){
        this.regimenAction.TargetProperty = property;
        this.setTargetValueArray();
    }
    setRegimenActionTargetOperator(operator: string){
        this.regimenAction.TargetOperator = operator;
        this.setTargetValueArray();
    }
    setRegimenActionTargetValue(value: number){
        this.regimenAction.TargetValue = value.toString();
    }

    setRegimenActionUsing(using: string){
        this.regimenAction.UsingSelection = using;
    }

    setTargetValueArray(){
        if(this.regimenAction.TargetOperator.endsWith("Percent")){
            this.targetValueArray = this.generateArrayValues(100, 10);
        }
        else if(this.regimenAction.TargetProperty.endsWith("Multiplier")){
            this.targetValueArray = this.generateArrayValues(35, 1);
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

    addRegimenAction(){
        if(this.selectedCharacter.regimen == null){
            this.selectedCharacter.regimen = new Regimen();
        }
        this.selectedCharacter.regimen.RegimenStack.push(this.regimenAction)
        this.regimenAction = new RegimenAction();
    }

}