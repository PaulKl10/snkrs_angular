import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/AuthApi/auth-api.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pseudo: string = "";
  email: string = "";
  password: string = "";
  gender: string = "femme";
  lastname: string = "";
  firstname: string = "";
  birthDate!: Date;
  adress: number = 0;
  street: string = "";
  code_postal!: number;
  city: string = "";
  succes: string = "";
  error: string = "";
  constructor(private authService: AuthApiService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  onSubmit() {
    this.adressRegisterAndRegister();
  }

  adressRegisterAndRegister() {
    this.authService.adressRegister(this.street, this.code_postal, this.city)
      .pipe(
        switchMap((response) => {
          if (response && response.id) {
            console.log('Adresse enregistrée avec succès !');
            this.adress = response.id;
            return this.authService.register(this.pseudo, this.email, this.password, this.gender, this.lastname, this.firstname, this.birthDate, this.adress);
          }
          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            console.log('Enregistré avec succès !');
            this.succes = "Vous avez été enregistré avec succès !";
            window.scrollTo(0, 0);
          }
        },
        error: (error) => {
          console.error('Erreur lors de la connexion:', error);
          this.error = "L'utilisateur existe déjà !";
          window.scrollTo(0, 0);
        },
      });
  }
}
