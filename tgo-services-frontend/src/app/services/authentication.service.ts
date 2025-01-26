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
  user: User | null = null;
  private authenticated = false;  
  //private authenticatedSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = this.apiService.getAPIUrl();
  

  async isAuthenticated() {
    try {
      var answer = await firstValueFrom(this.http.get<Record<string, any>>(`${this.apiUrl}authenticated/`, {withCredentials: true}));
      console.log(answer);
      return answer['authenticated'];
    } catch (error) {
      return false
    }
  }

  async login(email: string, password: string):Promise<boolean> {
    const data = {"email": email, "password": password};
    try {
      var answer = await firstValueFrom(this.http.post(`${this.apiUrl}login/`, data, {withCredentials: true}));
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
}
