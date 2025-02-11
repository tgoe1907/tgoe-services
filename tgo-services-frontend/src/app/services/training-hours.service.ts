import { Injectable } from '@angular/core';
import { TrainHour, TrainHourInterface } from '../models/train-hour';
import { SportGroupsService } from './sport-groups.service';
import { Observable, of, from, BehaviorSubject, map } from 'rxjs';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
type TrainHourDictionary = {
  [key: number]: TrainHour;
};


@Injectable({
  providedIn: 'root'
})
export class TrainingHoursService {
  private apiUrl = this.apiService.getAPIUrl();
  constructor(private sportsGroupService: SportGroupsService, private apiService: ApiService, private http: HttpClient) {
    this.trainHoursSubject.next(Object.values(this.train_hours)); 
    this.getTrainHours(1).subscribe(arr => {
      const output: any = JSON.parse(arr.toString());
      output.forEach((element: any) => {
        element.date = new Date(element.date)
        const hour = TrainHour.fromJson(element);
        this.train_hours[hour.id] = hour;
      });
      this.trainHoursSubject.next(Object.values(this.train_hours));
      console.log(this.train_hours)
    })
  }
  maxId = 10000;
  private trainHoursSubject = new BehaviorSubject<TrainHour[]>([]);
  private train_hours: TrainHourDictionary = {}
    
  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() 
    );
  }

  updateTrainHour(trainHour: TrainHour): void {
    let data = JSON.parse(JSON.stringify(trainHour))
    delete data['id']
    data['date'] = data['date'].substring(0, 10)
    this.http.put<TrainHourInterface>(`${this.apiUrl}trainhour/${trainHour.id}/`, 
      data, {withCredentials: true}).subscribe(
        answer => {
          console.log(answer)
          this.train_hours[trainHour.id] = trainHour; // Beispiel für eine ID als Schlüssel
          this.trainHoursSubject.next(Object.values(this.train_hours)); // Alle Werte erneut ausgeben
        }
      )
  }

  addTrainHour(trainHour: TrainHour) {
    let data = JSON.parse(JSON.stringify(trainHour))
    data['trained_by'] = [data['trained_by']]
    data['date'] = data['date'].substring(0, 10)
    const response = this.http.post<TrainHourInterface>(`${this.apiUrl}trainhour/`, 
      data, {withCredentials: true})
    response.subscribe(res => {
      trainHour.id = res.id;
      this.train_hours[res.id] = trainHour;
      this.trainHoursSubject.next(Object.values(this.train_hours)); 
    })
  }

  deleteTrainHour(trainHour: TrainHour) {
    this.http.delete(`${this.apiUrl}trainhour/${trainHour.id}/`, {withCredentials: true}).subscribe(
      answer => {
        delete this.train_hours[trainHour.id]
        this.trainHoursSubject.next(Object.values(this.train_hours)); // Alle Werte erneut ausgeben
      }
    )

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

  getTrainHours(id: number) {
    const data = {'user_id': id};
    return this.http.post(`${this.apiUrl}trainhour/get_trainhour_by_user/`, 
      data, {withCredentials: true})
  }

}
