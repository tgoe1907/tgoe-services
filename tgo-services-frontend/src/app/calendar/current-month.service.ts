import { Injectable } from '@angular/core';
import { eachDayOfInterval, endOfMonth, format, getDay } from 'date-fns';


@Injectable({
  providedIn: 'root'
})
export class CurrentMonthService {

  constructor() { 
    const currentDate = new Date()
    const currentYear = parseInt(format(currentDate, 'yyyy'));
    const currentMonth = parseInt(format(currentDate, 'MM')) -1;
    this.year = currentYear;
    this.month = currentMonth;
    this.updateCalendar(currentYear, currentMonth);
  }
  daysOfMonth = [[1,2,3,4,5,6,7], [8,9,10,11,12,13,14], [15,16,17,18,19,20,21], [22,23,24,25,26,27,28]];
  weekdays = ["MO", "DI", "MI", "DO", "FR", "SA", "SO"];
  fullWeekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
  monthList = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
  month: number;
  year: number

  getWeekday(date: Date) {
    var weekday = getDay(date) -1
    if (weekday == -1) {
      weekday = 6
    }
    return weekday
  }

  updateCalendar(year: number, month: number): void {
    this.daysOfMonth = [];
    const start = new Date(year, month, 1);
    const end = endOfMonth(start)
    const day_list_string = eachDayOfInterval({start, end}).map((date) => format(date, 'dd'))
    const day_list = day_list_string.map( Number );
    const date = new Date(year, month, 1)
    
    //start with monday as 0
    var weekday_start = this.getWeekday(date);
    let week: number[] = new Array(weekday_start).fill(-1);
    for (let i=1; i<=day_list.length; i++) {
      if (weekday_start < 7) {
        week.push(i)
      } else {
        weekday_start = 0;
        this.daysOfMonth.push(week);
        week = [i];
      }
      weekday_start++;
    }
    while(week.length < 7) {
      week.push(-1);
    }
    this.daysOfMonth.push(week)
    
  }
}
