import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { MobCard } from '../models/admin';

@Injectable()
export class MobCardsService {
    mobCards = [];

    constructor(private _apiService: ApiService) {
    }

    async getCards(){
        this.mobCards = await this._apiService.get('GetMobCards');
        return this.mobCards;
    }

    async createCard(mobCard: MobCard){
        await this._apiService.post(JSON.stringify(mobCard), 'CreateMobCard');
    }

    async updateCard(mobCard: MobCard){
        await this._apiService.post(JSON.stringify(mobCard), 'UpdateMobCard');
    }

    async deleteCard(cardId: string){
        var params = new Map<string, string>();
        params.set('cardId', cardId);
        await this._apiService.get('DeleteMobCard', params);
    }

}