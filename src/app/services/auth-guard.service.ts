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
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const url: string = state.url;
    return await this.checkLogin(url);
  }

  async checkLogin(url: string): Promise<boolean> {
    if (!this.autorized && url === '/auth') {
      return true;
    }
    const checked = await this.authService.check();

    if (this.autorized && checked) {
      return !(url === '/auth');
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
