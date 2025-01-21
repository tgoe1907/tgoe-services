import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor() { }
  active: boolean = false;
  position = { top: '0px', left: '0px' };
  date = new Date(); 
  getDay() {
    const day = Number(format(this.date, 'dd'));
    return day;
  }
}
