import { Component, OnInit } from '@angular/core';

import { Guild, Character, Item } from './models/guild'

import { GuildService } from './guild.service'

@Component({
    selector: 'characters',
    templateUrl: './characters.component.html',
    styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
    guild: Guild;
    selectedCharacter: Character;
    selectedCharacterEquipment: Item[];

    constructor(private _guildService: GuildService) {
        this.selectedCharacter = new Character();
        this.guild = new Guild();
        this.guild = _guildService.getCurrentGuild();

        
        console.log(this.guild.characters);
    }

    ngOnInit() {
        this.selectedCharacter = this.guild.characters[0];
        this.getEquipment(this.selectedCharacter);
        console.log(this.selectedCharacterEquipment)
     }

    onSelect(character: Character): void {
        this.selectedCharacter = character;
    }

    getEquipment(character: Character){
        for ( let equipment in character.equipmentSheet){
            var value = this.guild.guildInventory.equippableItems.find(x => x.itemId == equipment);
            this.selectedCharacterEquipment.push(value);
        }
    }
}