import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) { }
  user: User | null = null;
  private authenticated = false;  
  //private authenticatedSubject = new BehaviorSubject<boolean>(false);
  

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
