import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation',
  imports: [NgClass, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  showMenu = false;
  constructor(private authService: AuthenticationService) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  logout() {
    this.authService.logout()?.subscribe(answer => console.log(answer));
  }
}
