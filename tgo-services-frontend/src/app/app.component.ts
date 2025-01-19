import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'tgo-services-frontend';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

}
