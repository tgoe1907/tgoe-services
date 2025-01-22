import { Injectable } from '@angular/core';
import { SportsGroup } from './models/sports-group';
import { DepartmentService } from './department.service';

@Injectable({
  providedIn: 'root'
})
export class SportGroupsService {
  
  constructor(private departmentService: DepartmentService) { }
  sport_group_list = [
    new SportsGroup(0, "Parkour 16+", this.departmentService.departments[0]),
    new SportsGroup(1, "Parkour Jugend", this.departmentService.departments[0]),
    new SportsGroup(2, "Parkour Kids+", this.departmentService.departments[0]),
    new SportsGroup(3, "Volleyball 1 Herren", this.departmentService.departments[1]),
  ]
}
