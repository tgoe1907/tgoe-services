import { Injectable } from '@angular/core';
import { SportsGroup } from '../models/sports-group';
import { DepartmentService } from './department.service';

type SportsGroupDictionary = {
  [key: number]: SportsGroup;
};


@Injectable({
  providedIn: 'root'
})
export class SportGroupsService {

  constructor(private departmentService: DepartmentService) { }
  private sport_group_dict: SportsGroupDictionary = {
    1: new SportsGroup(1, "Parkour 16+", this.departmentService.departments[0]),
    2: new SportsGroup(2, "Parkour Jugend", this.departmentService.departments[0]),
    3: new SportsGroup(3, "Parkour Kids+", this.departmentService.departments[0]),
    4: new SportsGroup(4, "Volleyball 1 Herren", this.departmentService.departments[1]),
  };
  
  getDictAsList() {
    return Object.values(this.sport_group_dict);
  }

  getGroupById(id: number) {
    if (id in Object.keys(this.sport_group_dict)) {
      return this.sport_group_dict[id];
    } else {
      throw Error("Index not in dict sports_group_dict")
    }
  }
}
