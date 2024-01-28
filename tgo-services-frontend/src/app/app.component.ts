import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tgo-services-frontend';
  test_variable = 'Irgendein scheiß';
  hidden = false;
  constructor(){}
  mystery() {
    this.hidden = !this.hidden;
  }
}
