import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tgo-services-frontend';

  constructor(private apiService: ApiService) {}

  public users: any[] = [];

  public user: any = {
    forname: '',
    lastname: '',
    email: '',
    date: '',
  };

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsers().subscribe(
      (response) => {
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
