import { Component, OnInit } from '@angular/core';

import { MobCard } from '../../../models/admin';

import { MobCardsService } from '../../../services/mob-cards.service';

@Component({
    selector: 'mob-cards',
    templateUrl: './mob-cards.component.html',
    styleUrls: ['./mob-cards.component.css']
})

export class MobCardsComponent implements OnInit{
    private mobCards = [];
    private enableAdd: boolean;
    addingMobCard: MobCard;
    
    constructor(private _mobCardsService: MobCardsService){
        this.enableAdd = false;
        this.addingMobCard = new MobCard();
    }

    toggleAdd(){
        if(this.enableAdd == false){
            this.enableAdd = true;
        }
        else{
            this.enableAdd = false;
        }
    }

    async createMobCard(){
        await this._mobCardsService.createCard(this.addingMobCard);
        this.mobCards = await this._mobCardsService.getCards();
        this.toggleAdd();
    }

    async updateMobCard(mobCard: MobCard){
        await this._mobCardsService.updateCard(mobCard);
        this.mobCards = await this._mobCardsService.getCards();
        this.toggleEdit(mobCard);
    }

    async deleteMobCard(mobCard: MobCard){
        await this._mobCardsService.deleteCard(mobCard.mobCardId);
        this.mobCards = await this._mobCardsService.getCards();
    }

    async toggleEdit(mobCard: MobCard){
        if(mobCard.editMode == false || mobCard.editMode == null){
            mobCard.editMode = true;
        }
        else{
            mobCard.editMode = false;
        }
    }

    async ngOnInit() {
        this.mobCards = await this._mobCardsService.getCards();
    }

    onKey(input, targetProperty: string, mobCard?: MobCard) {
        if(mobCard != null){
            this.editSelectedProperty(input, targetProperty, mobCard);
        }
        else{
            this.editSelectedProperty(input, targetProperty, this.addingMobCard);
        }
        
    }

    editSelectedProperty(input, targetProperty, mobCard){
        if(targetProperty=='name'){
            mobCard.name = input;
        }else if(targetProperty=='strength'){
            mobCard.strength = input;
        }else if(targetProperty=='agility'){
            mobCard.agility = input;
        }else if(targetProperty=='dexterity'){
            mobCard.dexterity = input;
        }else if(targetProperty=='intelligence'){
            mobCard.intelligence = input;
        }else if(targetProperty=='vitality'){
            mobCard.vitality = input;
        }else if(targetProperty=='focus'){
            mobCard.focus = input;
        }
    }
    
}