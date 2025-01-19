import { Component, Input } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-week',
  standalone: true,
  imports: [DayComponent, NgFor],
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent {
  @Input() week: number[] = [1,2,3,4,5,6,7]

  handleClick(day: number): void {
    console.log(day)
  }
}
