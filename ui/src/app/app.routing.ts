import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './loginRegister/login';
import { RegisterComponent } from './loginRegister/register';
import { AuthGuard } from './_guards';
import { UsersManagerComponent } from './users-manager/users-manager.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},/**, canActivate: [AuthGuard]  */
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'users-manger', component: UsersManagerComponent  },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);