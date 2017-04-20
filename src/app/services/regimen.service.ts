import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegimenService {
    responseArray: string[]
    constructor(private apiService: ApiService) {
        this.responseArray = [];
    }

    async getRegimenActionBlock(type: string){
        var params = new Map<string, string>();
        params.set("type", type);
        this.responseArray =  await this.apiService.get('RegimenActionBlock', params);
        return this.responseArray;
    }
    
}