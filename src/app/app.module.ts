import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialUiModule } from './material-ui/material-ui.module';
import { AppRoutingModule } from './routing.module';

import { AppComponent } from './components/app/app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthLoginComponent } from './components/auth/auth-login/auth-login.component';
import { AuthSignupComponent } from './components/auth/auth-signup/auth-signup.component';
import { AuthService, TransactionsService, SocketService, AuthGuard, RequestOptionsInterceptor } from './services/';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionsTableComponent } from './components/transactions/transactions-table/transactions-table.component';
import { TransactionsInfoComponent } from './components/transactions/transactions-info/transactions-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    AuthLoginComponent,
    AuthSignupComponent,
    TransactionsComponent,
    TransactionsTableComponent,
    TransactionsInfoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialUiModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    TransactionsService,
    AuthService,
    SocketService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestOptionsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
