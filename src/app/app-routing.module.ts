import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuildsComponent } from './pages/guilds/guilds.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { ZonesComponent } from './pages/zones/zones.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CharacterCardsComponent } from './pages/admin/character_cards/character-cards.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch:'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'guild/:id', component: GuildsComponent },
    { path: 'characters', component: CharactersComponent },
    { path: 'zones', component: ZonesComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'charactercards', component: CharacterCardsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}