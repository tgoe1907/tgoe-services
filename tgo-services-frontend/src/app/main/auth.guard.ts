import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  async canActivate() {
    const isLoggedIn = await this.authService.isAuthenticated();
    if (!isLoggedIn) {
      this.router.navigate(['/']); // Zur Login-Seite umleiten
      return false;
    }
    return true;
  }
}