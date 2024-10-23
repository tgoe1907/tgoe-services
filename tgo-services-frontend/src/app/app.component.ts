import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tgo-services-frontend';

  constructor(private apiService: ApiService) {}

  public users: User[] = [];

  public user: User = {first_name: '', last_name: '', birthdate: new Date, email: ''};

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log('API response: ', response);
      },
      (error) => {
        console.error('API error: ', error);
      }
    )
  }

  createUser(): void {
    this.apiService.createUser(this.user).subscribe(
      (response) => {
        console.log('User erstellt', response)
      },
      (error) => {
        console.error('Fehler beim errstellen', error)
      }
    )
  }

}
