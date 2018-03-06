import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services';
import { AuthComponent } from '../app/components/auth/auth.component';
import { TransactionsComponent } from './../app/components/transactions/transactions.component';

const appRoutes: Routes = [
  { path: 'auth', /*canActivate: [AuthGuard]*/ component: AuthComponent },
  { path: 'transactions', canActivate: [AuthGuard], component: TransactionsComponent },
  { path: '', redirectTo: '/transactions', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
