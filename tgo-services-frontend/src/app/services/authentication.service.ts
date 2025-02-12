import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private apiService: ApiService) { }
  private user: User | null = null;
  private authenticated = false;  
  //private authenticatedSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = this.apiService.getAPIUrl();

  getAuthenticatedUser() {
    return this.user;
  }

  async isAuthenticated() {
    try {
      var answer = await firstValueFrom(this.http.get<Record<string, any>>(`${this.apiUrl}authenticated/`, {withCredentials: true}));
      //console.log(answer);
      this.http.get<Record<string, any>>(`${this.apiUrl}user/`, {withCredentials: true}).subscribe(
        user => {
          this.user = new User(user['id'], user['first_name'], user['last_name'], user['birthdate'], user['email'], 
            user['department_manager'], user['admin'], user['trainer_of'], user['participate_at'],
            user['membership_number'], user['date_joined']);
        }
      )
      return answer['authenticated'];
    } catch (error) {
      return false
    }
  }

  async login(email: string, password: string):Promise<boolean> {
    const data = {"email": email, "password": password};
    try {
      var answer = await firstValueFrom(this.http.post(`${this.apiUrl}login/`, data, {withCredentials: true}));
      this.http.get<Record<string, any>>(`${this.apiUrl}user/`, {withCredentials: true}).subscribe(
        user => {
          console.log(user)
        }
      )
      if ('jwt token' in answer){
        this.authenticated = true;    
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }


  logout() {
    try {
      console.log("Logout")
      return this.http.get(`${this.apiUrl}logout/`, {withCredentials: true});
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
