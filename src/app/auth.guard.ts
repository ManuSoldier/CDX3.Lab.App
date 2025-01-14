import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { decodeToken } from './utils/jwtTokenUtils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuthenticated = this.isUserAuthenticated(); 
    const isAuthorized = this.isUserAuthorized();

    if(!isAuthorized) {
      window.location.href = '/context-selection';
      return false;
    }
    if (!isAuthenticated) {
      window.location.href = '/landing-page';
      return false;
    }
    return true;
  }

  private isUserAuthenticated(): boolean {
    const token = this.cookieService.get('access_token');
    return !!token; 
  }

  private isUserAuthorized(): boolean {
    const token = this.cookieService.get('access_token');
    const decodedToken = decodeToken(token);

    if(decodedToken?.systemId && decodedToken?.tenantId) {
      if(decodedToken.systemId === '10' && decodedToken.tenantId === '10') return true;
    }
    return false; 
  }
}