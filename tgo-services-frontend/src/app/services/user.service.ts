import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new User(-1, "", "", new Date(), "")
  constructor(private apiService: ApiService, private http: HttpClient) { 
      this.getUser().then(user => {
        this.user = user;
      });  
  }
  private apiUrl: string = this.apiService.getAPIUrl(); 

  async getUser(): Promise<User> {
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}user/`, {withCredentials: true}));
      if (!response) {
        throw new Error('Could not get user');
      }
      const user: User = await User.fromJson(response);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error}`);
    }
  }

  getUser2() {
    return this.http.get<User>(`${this.apiUrl}user/`, {withCredentials: true});
  }
  
  updateUser(user: User) {
    const response = this.http.post<any>(
      `${this.apiUrl}update/`, user, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    ).toPromise();
    return response;
  }
}