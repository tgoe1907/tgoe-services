import { Component, Input, ViewChild } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-week',
    imports: [DayComponent, NgFor],
    standalone: true,
    templateUrl: './week.component.html',
    styleUrls: ['./week.component.css']
})
export class WeekComponent {
  @Input() week: number[] = [1,2,3,4,5,6,7]
  appointmentHidden = true;
  position = { top: '0px', left: '0px' };
  @ViewChild(DayComponent) day!: DayComponent;


  createAppointment(event: MouseEvent) {
    this.appointmentHidden = !this.appointmentHidden;
    this.day.appointmentHidden = this.appointmentHidden;
    if (!this.appointmentHidden) {
      const button = event.target as HTMLElement;
      const rect = button.getBoundingClientRect();
      console.log(rect.bottom + window.scrollY)
      console.log(rect.left + window.scrollX)
      this.position = {
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
      }
    }
  }
}
