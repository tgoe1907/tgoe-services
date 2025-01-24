import { Injectable } from '@angular/core';
import { TrainHour } from '../models/train-hour';
import { SportGroupsService } from './sport-groups.service';
import { Observable, of, from, BehaviorSubject, map } from 'rxjs';

type TrainHourDictionary = {
  [key: number]: TrainHour;
};


@Injectable({
  providedIn: 'root'
})
export class TrainingHoursService {
  constructor(private sportsGroupService: SportGroupsService ) {
    this.trainHoursSubject.next(Object.values(this.train_hours)); 
  }
  maxId = 10000;
  private trainHoursSubject = new BehaviorSubject<TrainHour[]>([]);
  private train_hours: TrainHourDictionary = {
    0: new TrainHour(0, this.sportsGroupService.getGroupById(0), new Date(2025, 0, 23), "18:30", "20:00"),
    1: new TrainHour(1, this.sportsGroupService.getGroupById(1), new Date(2025, 0, 20), "18:00", "19:30"),
    2: new TrainHour(2, this.sportsGroupService.getGroupById(0), new Date(2025, 0, 20), "19:30", "21:00")
  }
    
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() 
    );
  }

  updateTrainHour(trainHour: TrainHour): void {
    this.train_hours[trainHour.id] = trainHour; // Beispiel für eine ID als Schlüssel
    this.trainHoursSubject.next(Object.values(this.train_hours)); // Alle Werte erneut ausgeben
  }

  addTrainHour(trainHour: TrainHour) {
    const newId = this.getNewId();
    trainHour.id = newId;
    this.train_hours[newId] = trainHour;
    this.trainHoursSubject.next(Object.values(this.train_hours)); // Alle Werte erneut ausgeben
  }

  deleteTrainHour(trainHour: TrainHour) {
    delete this.train_hours[trainHour.id]
    this.trainHoursSubject.next(Object.values(this.train_hours)); // Alle Werte erneut ausgeben
  }

  selectOnDate(date: Date): Observable<TrainHour[]> {
    
    return this.trainHoursSubject.asObservable().pipe(
      map((trainHours) =>
        trainHours.filter((trainHour) =>
          this.isSameDay(trainHour.date, date)
        )
      )
    );
  }

  getNewId() {
    this.maxId++;
    return this.maxId;
  }


}
