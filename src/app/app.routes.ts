import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AboutComponent } from './components/about/about';
import { LoginComponent } from './components/login/login';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemDetailsComponent } from './components/item-details/item-details';
import { SignupComponent } from './components/signup/signup';
import { ProfileComponent } from './components/profile/profile';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'items', component: ItemsListComponent },
  { path: 'items/:id', component: ItemDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
