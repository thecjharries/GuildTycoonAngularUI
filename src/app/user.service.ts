import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';

import { UserData } from './models/user-data'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    userData: UserData;
    constructor(private _apiService: ApiService) {
    }

    async getUser(){
        var params = new Map<string, string>();
        this.userData =  await this._apiService.get('GetUser', params);
        return this.userData;
    }
    
}