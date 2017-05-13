import { Injectable }    from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserData } from '../models/user-data'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    userData: UserData;

    private _userDataSource = new BehaviorSubject<UserData>(new UserData());

    userData$ = this._userDataSource.asObservable();

    constructor(private _apiService: ApiService) {
    }

    async getUser(){
        var params = new Map<string, string>();
        this._userDataSource.next(await this._apiService.get('GetUser', params));
    }

    async createGuild(guildName: string, slotNumber: string){
        var params = new Map<string, string>();
        params.set('guildName', guildName);
        params.set('slotNumber', slotNumber);
        await this._apiService.get('CreateGuild', params);
        this._userDataSource.next(await this._apiService.get('GetUser', params));
    }

    async deleteGuild(guildId: string){
        var params = new Map<string, string>();
        params.set('guildId', guildId)
        await this._apiService.get('DeleteGuild', params);
        this._userDataSource.next(await this._apiService.get('GetUser', params));
    }
    
}