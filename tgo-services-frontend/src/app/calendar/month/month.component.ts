import { Component } from '@angular/core';
import { WeekComponent } from '../week/week.component';
import { NgFor } from '@angular/common';
import { eachDayOfInterval, endOfMonth, format, getDay } from 'date-fns';
import { forEach } from '@angular-devkit/schematics';
import { CurrentMonthService } from '../current-month.service';
import { AppointmentService } from '../appointment.service';
import { DayComponent } from '../day/day.component';

@Component({
    selector: 'app-month',
    imports: [WeekComponent, NgFor],
    standalone: true,
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.css']
})
export class MonthComponent {

  constructor(private currentCalendar: CurrentMonthService, private appointmentService: AppointmentService) {
    
  }
  ngOnInit() {
    const currentDate = new Date()
    const currentYear = parseInt(format(currentDate, 'yyyy'));
    const currentMonth = parseInt(format(currentDate, 'MM')) -1;
    this.currentCalendar.year = currentYear;
    this.currentCalendar.month = currentMonth;
    this.updateMonthList(currentYear, currentMonth);
  }

  get month_list() {
    return this.currentCalendar.month_list;
  }

  get weekdays() {
    return this.currentCalendar.weekdays;
  }

  get days_of_month() {
    return this.currentCalendar.days_of_month;
  }

  get month() {
    return this.currentCalendar.month;
  }
  get year() {
    return this.currentCalendar.year;
  }

  prev(): void {
    if (this.currentCalendar.month > 0) {
      this.currentCalendar.month--;
    } else {
      this.currentCalendar.month = 11;
      this.currentCalendar.year--;
    }
    this.updateMonthList(this.currentCalendar.year, this.currentCalendar.month);
    DayComponent.overlayRef.detach();
    this.appointmentService.active = false;
  }

  next(): void {
    if (this.currentCalendar.month < 11) {
      this.currentCalendar.month++;
    } else {
      this.currentCalendar.month = 0;
      this.currentCalendar.year++;
    }
    this.updateMonthList(this.currentCalendar.year, this.currentCalendar.month);
    DayComponent.overlayRef.detach();
    this.appointmentService.active = false;
  }


  updateMonthList(year: number, month: number): void {
    this.currentCalendar.updateCalendar(year, month);    
  }
}
