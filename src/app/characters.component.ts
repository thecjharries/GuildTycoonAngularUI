import { Component, OnInit, Pipe } from '@angular/core';

import { Guild, Character, Item, RegimenAction } from './models/guild';

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
    regimenAction: RegimenAction;

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
        console.log(this.selectedCharacterEquipment);
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

    setRegimenActionTargetProperty(property: string){
        this.regimenAction.TargetProperty = property;
    }
    setRegimenActionTargetOperator(operator: string){
        this.regimenAction.TargetOperator = operator;
    }

}