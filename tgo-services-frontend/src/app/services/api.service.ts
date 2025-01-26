import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  private apiUrl = 'http://127.0.0.1:8000/api/';
  getAPIUrl () {
    return this.apiUrl;
  }
}

