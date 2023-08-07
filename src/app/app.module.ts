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

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    UsersComponent,
    CreditCardDashedPipe,
    SortPipePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
