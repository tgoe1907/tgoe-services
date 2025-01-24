import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { AuthenticationService } from './services/authentication.service';
import { Observable, of } from 'rxjs';
import { LoginPageComponent } from './user-management/login-page/login-page.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'tgo-services-frontend';

  constructor(private apiService: ApiService, private authService: AuthenticationService) {}
  authenticated = this.authService
  authenticated$: Observable<boolean> = of(false);
  
  ngOnInit(): void {
    this.authenticated$ = this.authService.isAuthenticated();
  }

}
