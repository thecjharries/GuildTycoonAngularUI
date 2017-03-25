import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { GuildsComponent } from './guilds.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch:'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'guild/:id', component: GuildsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}