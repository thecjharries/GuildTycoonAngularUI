import { Component, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'

import { UserData } from '../../models/user-data'

@Component({
    selector: 'my-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
    userData: UserData;
    name: string;
    enteringName1 = false;
    enteringName2 = false;
    enteringName3 = false;
    enteringName4 = false;
    enteringName5 = false;
    constructor(private _userService: UserService){

    }
    async ngOnInit() {
        this.userData = await this._userService.getUser();
    }
    async createGuild(slotNumber: number){
        this.toggleEditing(slotNumber);
        this.userData = await this._userService.createGuild(this.name, slotNumber.toString())
    }

    async deleteGuild(guildId: string){
        this.userData = await this._userService.deleteGuild(guildId)
    }

    toggleEditing(slotNumber: number){
        if(slotNumber == 1){
            if(this.enteringName1 == false){
                this.enteringName1 = true;
            }
            else{
                this.enteringName1 = false;
            }
        }
        else if(slotNumber == 2){
            if(this.enteringName2 == false){
                this.enteringName2 = true;
            }
            else{
                this.enteringName2 = false;
            }
        }
        else if(slotNumber == 3){
            if(this.enteringName3 == false){
                this.enteringName3 = true;
            }
            else{
                this.enteringName3 = false;
            }
        }
        else if(slotNumber == 4){
            if(this.enteringName4 == false){
                this.enteringName4 = true;
            }
            else{
                this.enteringName4 = false;
            }
        }
        else if(slotNumber == 5){
            if(this.enteringName5 == false){
                this.enteringName5 = true;
            }
            else{
                this.enteringName5 = false;
            }
        }
    }

    onKey(name: string) {
        this.name = name;
    }
}