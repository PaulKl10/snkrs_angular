import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authToken = localStorage.getItem('authToken');
    
    if (authToken) {
      const decodedToken: any = jwtDecode(authToken);
      if (decodedToken.roles.includes('ROLE_ADMIN')) {
        return true;
      } else {
        this.router.navigate(['/accueil']);
        return false; // Return false since navigation is blocked
      }
    } else {
      this.router.navigate(['/accueil']);
      return false; // Return false since navigation is blocked
    }
  }
}