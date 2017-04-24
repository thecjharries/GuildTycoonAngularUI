import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { CharacterCard } from '../models/admin';

@Injectable()
export class CharacterCardsService {
    private character = [];

    constructor(private apiService: ApiService) {
    }

    async getCards(){
        this.character = await this.apiService.get('GetCharacterCards');
        return this.character;
    }

    
}