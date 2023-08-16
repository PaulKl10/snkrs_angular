import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthApiService } from '../services/AuthApi/auth-api.service';
import { Router } from '@angular/router';

const AUTH_TOKEN_KEY = 'authToken';
const USERNAME_KEY = 'username';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  private subscription: Subscription | undefined;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthApiService, private router: Router) {
    const authToken = localStorage.getItem('authToken');
    this.isLoggedIn = authToken !== null;
  }

  onSubmit() {
    this.subscription = this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response && response.token) {
          this.storeAuthToken(response.token);
          this.storeEmail(this.email);
          console.log('Connecté avec succès !');

          window.location.reload();
        }
      },
      error: (error) => {
        console.error('Erreur lors de la connexion:', error);
      },
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  private storeAuthToken(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  private storeEmail(email: string) {
    localStorage.setItem(USERNAME_KEY, email);
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public logout() {
    this.authService.logout();
    window.location.reload();
  }
}
