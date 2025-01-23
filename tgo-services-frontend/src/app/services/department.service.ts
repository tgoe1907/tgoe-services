import { Injectable } from '@angular/core';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }
  departments = [
    new Department(0, "Fitness"),
    new Department(1, "Volleyball"),
    new Department(2, "Leichtathletik"),
    new Department(3, "Turnen"),
    new Department(4, "Ski & Wandern"),
  ]

}
