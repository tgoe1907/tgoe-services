import { Injectable } from '@angular/core';
import { SportsGroup } from '../models/sports-group';
import { DepartmentService } from './department.service';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';

type SportsGroupDictionary = {
  [key: number]: SportsGroup;
};


@Injectable({
  providedIn: 'root'
})
export class SportGroupsService {
  private apiUrl = this.apiService.getAPIUrl();
  constructor(private departmentService: DepartmentService, private apiService: ApiService, 
    private http: HttpClient, private userService: UserService) { 
      this.sportGroupSubject.next(Object.values(this.sport_group_dict)); 
      let groups = this.getGroupsOfTrainer()
      groups.subscribe(
        array => {
          array.forEach(
            elem => {
              this.sport_group_dict[elem.id] = elem;
            }
          )
          this.sportGroupSubject.next(Object.values(this.sport_group_dict)); 
        }
      )
  }
  private sportGroupSubject = new BehaviorSubject<SportsGroup[]>([]);
  private sport_group_dict: SportsGroupDictionary = {};
  
  getDictAsList() {
    return Object.values(this.sport_group_dict);
  }

  getGroupById(id: number) {
    if (Object.keys(this.sport_group_dict).includes(id.toString())) {
      return this.sport_group_dict[id];
    } else {
      throw Error("Index not in dict sports_group_dict")
    }
  }

  getGroupsOfTrainer(): Observable<SportsGroup[]> {
    return this.userService.getUser2().pipe(
      switchMap(user => {
        const groupIds = user.trainer_of;
        const requests = groupIds.map(id =>
          this.http.get<SportsGroup>(`${this.apiUrl}sportsgroup/${id}/`, { withCredentials: true }).pipe(
            map(answer => SportsGroup.fromJson(answer))
          )
        );
        return forkJoin(requests); // Wartet auf alle Requests und gibt ein Array zurück
      })
    );
  }
}
