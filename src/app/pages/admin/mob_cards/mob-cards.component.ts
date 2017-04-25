import { Component, OnInit } from '@angular/core';

import { MobCard } from '../../../models/admin';
import { Regimen, RegimenAction, RegimenActionBlock } from '../../../models/guild';

import { MobCardsService } from '../../../services/mob-cards.service';
import { RegimenService } from '../../../services/regimen.service';

@Component({
    selector: 'mob-cards',
    templateUrl: './mob-cards.component.html',
    styleUrls: ['./mob-cards.component.css']
})

export class MobCardsComponent implements OnInit{
    private mobCards = [];
    enableAdd = false;
    enableRegimenAdd = false;
    addingMobCard = new MobCard();
    selectedMobCard = new MobCard();
    regimenActionProperties = [];
    regimenActionOperators = [];
    regimenActionTargets = [];
    regimenActionUsing = [];
    regimenAction = new RegimenAction();

    targetValueArray = [];
    
    constructor(private _mobCardsService: MobCardsService,  private _regimenService: RegimenService){
    }

    async ngOnInit() {
        this.mobCards = await this._mobCardsService.getCards();

        this.regimenActionProperties = await this._regimenService.getRegimenActionBlock("Property");
        this.regimenActionOperators = await this._regimenService.getRegimenActionBlock("Operator");
        this.regimenActionTargets = await this._regimenService.getRegimenActionBlock("Target");
        this.regimenActionUsing = await this._regimenService.getRegimenActionBlock("Using");
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

    toggleEditRegimen(mobCard?: MobCard){
        if(this.enableRegimenAdd == false){
            this.enableRegimenAdd = true;
            this.selectedMobCard = mobCard;
            if(this.selectedMobCard.regimen == null){
                this.selectedMobCard.regimen = new Regimen();
            }
        }
        else{
            this.enableRegimenAdd = false;
        }
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

    async addRegimenAction(){
        this.selectedMobCard.regimen.regimenStack.push(this.regimenAction)
        await this._mobCardsService.updateCard(this.selectedMobCard);
        this.regimenAction = new RegimenAction();
    }

    async removeRegimenAction(index: number){
        this.selectedMobCard.regimen.regimenStack.splice(index, 1);
        await this._mobCardsService.updateCard(this.selectedMobCard);
    }

    generateArrayValues(max: number, interval:number){
        var valueArray = [];
        for(var _i = 0; _i <= max; _i= _i + interval){
            valueArray.push(_i);
        }
        return valueArray;
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
        }else if(targetProperty=='majorMobType'){
            mobCard.majorMobType = input;
        }else if(targetProperty=='subMobType'){
            mobCard.subMobType = input;
        }else if(targetProperty=='level'){
            mobCard.level = input;
        }
    }


    
}