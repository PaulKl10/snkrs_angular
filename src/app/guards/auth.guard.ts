import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authToken = localStorage.getItem('authToken');
    
    if (authToken) {
      const decodedToken: any = jwtDecode(authToken);
      if (decodedToken.username) {
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
