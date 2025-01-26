import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService, private http: HttpClient) { }
  private apiUrl: string = this.apiService.getAPIUrl(); 

  async getUser() {
    try {
          var answer = await firstValueFrom(this.http.get<Record<string, any>>(`${this.apiUrl}user/`, {withCredentials: true}));
          return User.fromJson(answer);
    } catch (error) {
          return null
    }
  }
  updateUser(user: User) {
    const response = this.http.post<any>(
      `${this.apiUrl}update/`, user, { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    ).toPromise();
    return response;
  }
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.apiUrl}/users/`);
  // }

  // createUser(user: any): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/users/`, user)
  // }
}
