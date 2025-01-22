import { Injectable } from '@angular/core';
import { TrainHour } from './models/train-hour';
import { SportGroupsService } from './sport-groups.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingHoursService {
  constructor(private sportsGroupService: SportGroupsService ) {}
  train_hours = [
    new TrainHour(0, this.sportsGroupService.sport_group_list[0], new Date(2025, 0, 23), "18:30", "20:00"),
    new TrainHour(1, this.sportsGroupService.sport_group_list[1], new Date(2025, 0, 20), "18:00", "19:30"),
    new TrainHour(2, this.sportsGroupService.sport_group_list[0], new Date(2025, 0, 20), "19:30", "21:00")
  ]
  isSameDay(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() 
    );
  }

  selectOnDate(date: Date) {
    var output: TrainHour[] = [];
    this.train_hours.forEach(element => {
      if (this.isSameDay(element.date, date)) {
        output.push(element);
      }
    });
    return output;
  }

}
