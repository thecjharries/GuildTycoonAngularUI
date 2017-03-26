import { Component, OnInit, Pipe } from '@angular/core';

import { Guild, Character, Item } from './models/guild';

import { GuildService } from './guild.service';

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

    constructor(private _guildService: GuildService) {
        this.itemsForEquipmentSlot = []
        this.guild = _guildService.getCurrentGuild();
        
        console.log(this.guild.characters);
    }

    ngOnInit() {
        this.selectedCharacter = this.guild.characters[0];
        this.getEquipment(this.selectedCharacter);
        console.log(this.selectedCharacterEquipment);
     }

    onSelect(character: Character): void {
        this.selectedCharacter = character;
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

    equipItem(item: Item){
        var slot = item.itemTypeId.split('-');
        this.selectedCharacter.equipmentSheet[slot[1]] = item.itemId;
        this.getEquipment(this.selectedCharacter);
    }
}