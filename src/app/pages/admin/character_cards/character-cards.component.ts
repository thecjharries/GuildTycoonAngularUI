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
        this.addingCharacterCard = new CharacterCard();
    }

    toggleAdd(){
        if(this.enableAdd == false){
            this.enableAdd = true;
        }
        else{
            this.enableAdd = false;
        }
    }

    async createCharacterCard(){
        await this._characterCardsService.createCard(this.addingCharacterCard);
        this.characterCards = await this._characterCardsService.getCards();
        this.toggleAdd();
    }

    async updateCharacterCard(characterCard: CharacterCard){
        await this._characterCardsService.updateCard(characterCard);
        this.characterCards = await this._characterCardsService.getCards();
        this.toggleEdit(characterCard);
    }

    async deleteCharacterCard(characterCard: CharacterCard){
        await this._characterCardsService.deleteCard(characterCard.cardId);
        this.characterCards = await this._characterCardsService.getCards();
    }

    async toggleEdit(characterCard: CharacterCard){
        if(characterCard.editMode == false || characterCard.editMode == null){
            characterCard.editMode = true;
        }
        else{
            characterCard.editMode = false;
        }
    }

    async ngOnInit() {
        this.characterCards = await this._characterCardsService.getCards();
    }

    onKey(input, targetProperty: string, characterCard?: CharacterCard) {
        if(characterCard != null){
            this.editSelectedProperty(input, targetProperty, characterCard);
        }
        else{
            this.editSelectedProperty(input, targetProperty, this.addingCharacterCard);
        }
        
    }

    editSelectedProperty(input, targetProperty, characterCard){
        if(targetProperty=='name'){
            characterCard.name = input;
        }else if(targetProperty=='strength'){
            characterCard.strength = input;
        }else if(targetProperty=='agility'){
            characterCard.agility = input;
        }else if(targetProperty=='dexterity'){
            characterCard.dexterity = input;
        }else if(targetProperty=='intelligence'){
            characterCard.intelligence = input;
        }else if(targetProperty=='vitality'){
            characterCard.vitality = input;
        }else if(targetProperty=='focus'){
            characterCard.focus = input;
        }
    }
    
}