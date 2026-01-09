import { Routes } from '@angular/router';
import { HomeComponent } from './screens/home-component/home-component';
import { AuthComponent } from './screens/auth-component/auth-component';
import { RegistrationComponent } from './screens/registration-component/registration-component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "auth", component: AuthComponent },
    { path: "reg", component: RegistrationComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
