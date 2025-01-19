import { Component } from '@angular/core';
import { WeekComponent } from '../week/week.component';
import { NgFor } from '@angular/common';
import { eachDayOfInterval, endOfMonth, format, getDay } from 'date-fns';
import { forEach } from '@angular-devkit/schematics';

@Component({
    selector: 'app-month',
    imports: [WeekComponent, NgFor],
    standalone: true,
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.css']
})
export class MonthComponent {
  days_of_month = [[1,2,3,4,5,6,7], [8,9,10,11,12,13,14], [15,16,17,18,19,20,21], [22,23,24,25,26,27,28]];
  weekdays = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
  month_list = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
  month = 1;
  year = 2025
  ngOnInit() {
    const currentDate = new Date()
    const currentYear = parseInt(format(currentDate, 'yyyy'));
    const currentMonth = parseInt(format(currentDate, 'MM')) -1;
    this.year = currentYear;
    this.month = currentMonth;
    this.updateMonthList(currentYear, currentMonth);
  }

  prev(): void {
    if (this.month > 0) {
      this.month--;
    } else {
      this.month = 11;
      this.year--;
    }
    this.updateMonthList(this.year, this.month);

  }

  next(): void {
    if (this.month < 11) {
      this.month++;
    } else {
      this.month = 0;
      this.year++;
    }
    this.updateMonthList(this.year, this.month);
  }


  updateMonthList(year: number, month: number): void {
    this.days_of_month = [];
    const start = new Date(year, month, 1);
    const end = endOfMonth(start)
    const day_list_string = eachDayOfInterval({start, end}).map((date) => format(date, 'dd'))
    const day_list = day_list_string.map( Number );
    const date = new Date(year, month, 1)
    
    //start with monday as 0
    var weekday_start = getDay(date) -1
    if (weekday_start == -1) {
      weekday_start = 6
    }
    let week: number[] = new Array(weekday_start).fill(-1);
    for (let i=1; i<=day_list.length; i++) {
      if (weekday_start < 7) {
        week.push(i)
      } else {
        weekday_start = 0;
        this.days_of_month.push(week);
        week = [i];
      }
      weekday_start++;
    }
    while(week.length < 7) {
      week.push(-1);
    }
    this.days_of_month.push(week)
    
  }
}
