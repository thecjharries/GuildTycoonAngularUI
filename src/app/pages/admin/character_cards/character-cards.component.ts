import { Component, OnInit } from '@angular/core';

import { CharacterCard } from '../../../models/admin';

import { CharacterCardsService } from '../../../services/character-cards.service';

@Component({
    selector: 'character-cards',
    templateUrl: './character-cards.component.html',
    styleUrls: ['./character-cards.component.css']
})

export class CharacterCardsComponent implements OnInit{
    private characterCards = [];
    private enableAdd: boolean;
    addingCharacterCard: CharacterCard;
    
    constructor(private _characterCardsService: CharacterCardsService){
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

    async ngOnInit() {
        this.characterCards = await this._characterCardsService.getCards();
        console.log(this.characterCards);
    }

    onKey(input) {
        if(input===this.addingCharacterCard.name){
            this.addingCharacterCard.name = input;
        }
        console.log(this.addingCharacterCard.name);
    }
    
}