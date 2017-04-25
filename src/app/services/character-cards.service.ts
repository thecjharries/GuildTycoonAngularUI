import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { CharacterCard } from '../models/admin';

@Injectable()
export class CharacterCardsService {
    characterCards = [];

    constructor(private _apiService: ApiService) {
    }

    async getCards(){
        this.characterCards = await this._apiService.get('GetCharacterCards');
        return this.characterCards;
    }

    async createCard(characterCard: CharacterCard){
        await this._apiService.post(JSON.stringify(characterCard), 'CreateCharacterCard');
    }

    async updateCard(characterCard: CharacterCard){
        await this._apiService.post(JSON.stringify(characterCard), 'UpdateCharacterCard');
    }

    async deleteCard(cardId: string){
        var params = new Map<string, string>();
        params.set('cardId', cardId);
        await this._apiService.get('DeleteCharacterCard', params);
    }

}