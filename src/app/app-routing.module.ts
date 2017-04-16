import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { GuildsComponent } from './guilds.component';
import { CharactersComponent } from './characters.component';
import { ZonesComponent } from './zones.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch:'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'guild/:id', component: GuildsComponent },
    { path: 'characters', component: CharactersComponent },
    { path: 'zones', component: ZonesComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}