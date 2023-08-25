import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserService } from './services/userService';
import { CreditCardDashedPipe } from './pipes/credit-card-dashed.pipe';
import { SortPipePipe } from './pipes/sort-pipe.pipe';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { UsersGuardService } from './services/userGuard-service';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileGuardService } from './services/profileGuard-service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    UsersComponent,
    CreditCardDashedPipe,
    SortPipePipe,
    LogInFormComponent,
    ProfileComponent,
    UsersTableComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [UserService, UsersGuardService, ProfileGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
