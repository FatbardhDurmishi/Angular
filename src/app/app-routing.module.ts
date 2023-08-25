import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersGuardService } from './services/userGuard-service';
import { ProfileGuardService } from './services/profileGuard-service';

const routes: Routes = [
  { path: 'register', component: FormComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [UsersGuardService],
  },
  { path: 'login', component: LogInFormComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ProfileGuardService],
  },
  { path: '', component: LogInFormComponent }, //default route
  { path: '**', component: LogInFormComponent }, //wildcard route, handles navigation when users attempt to navigate to a part of app that does not exist
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
