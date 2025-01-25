import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private authService: AuthenticationService, private router: Router) {}
  async login(email: string, password:string) {
    const isLoggedIn = await this.authService.login(email, password);
    if (isLoggedIn) {
      this.router.navigate(['/main']);
    }
  }
}
