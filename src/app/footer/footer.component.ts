import { Component } from '@angular/core';
import { ApiNewsletterService } from '../services/apiNewsletter/api-newsletter.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = "";
  success: string = "";
  error: string = "";
  constructor(private Api: ApiNewsletterService) { }

  onSubmit() {
    this.success = ""; // Réinitialiser le message de succès
    this.error = ""; // Réinitialiser le message d'erreur

    if (!this.validateEmail(this.email)) {
      this.error = "L'adresse email n'est pas valide.";
      return;
    }
    this.Api.add(this.email).subscribe({
      next: (Response) => {
        this.success = Response.message;
      },
      error: (error) => {
        console.log(error);
        this.error = "L'email est déjà enregistré dans la newsletter"
      },
    })
  }

  validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }
}
