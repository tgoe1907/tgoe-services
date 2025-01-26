import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [NgClass, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  logout() {
    console.log("logout")
  }
}
