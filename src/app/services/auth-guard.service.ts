import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    this.authService.autorized$.subscribe(authorized => {
      this.autorized = authorized;
    });
  }
  redirectUrl: string;
  autorized: boolean;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.autorized) {
      return true;
    }

    this.router.navigate(['/auth']);
    return false;
  }
}
