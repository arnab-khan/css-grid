import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
    { path: ':slug', component: MainComponent },
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: '**', component: MainComponent }
];
