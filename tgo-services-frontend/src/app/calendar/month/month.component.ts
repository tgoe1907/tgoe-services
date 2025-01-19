import { Component } from '@angular/core';
import { WeekComponent } from '../week/week.component';
import { NgFor } from '@angular/common';
import { eachDayOfInterval, endOfMonth, format } from 'date-fns';

@Component({
    selector: 'app-month',
    imports: [WeekComponent],
    standalone: true,
    templateUrl: './month.component.html',
    styleUrls: ['./month.component.css']
})
export class MonthComponent {
  month = [[1,2,3,4,5,6,7], [8,9,10,11,12,13,14], [15,16,17,18,19,20,21], [22,23,24,25,26,27,28]];
  weekdays = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
  month_list = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
  active_month = "Februar";
  year = 2025

  prev(): void {
    var index = this.month_list.indexOf(this.active_month)
    if (index > 0) {
      this.active_month = this.month_list[index -1];
    } else {
      this.active_month = this.month_list[11];
    }
  }

  next(): void {
    var index = this.month_list.indexOf(this.active_month)
    if (index < 11) {
      this.active_month = this.month_list[index +1];
    } else {
      this.active_month = this.month_list[0];
    }
  }

  updateMonthList(year: number, month: number): void {
    const start = new Date(year, month, 1);
    const end = endOfMonth(start)
    console.log(eachDayOfInterval({start, end}).map((date) => format(date, 'yyyy-MM-dd')))
  }

}
