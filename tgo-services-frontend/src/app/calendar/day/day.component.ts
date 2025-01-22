import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { CurrentMonthService } from '../current-month.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { AppointmentComponent } from "../appointment/appointment.component";
import { TrainHour } from 'src/app/models/train-hour';
import { TrainingHoursService } from 'src/app/training-hours.service';
import { CalendarEntryComponent } from '../calendar-entry/calendar-entry.component';

@Component({
    selector: 'app-day',
    standalone: true,
    imports: [CommonModule, PortalModule, AppointmentComponent, NgFor, CalendarEntryComponent],
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css'],
})
export class DayComponent {
  @Input() day!: number;
  @ViewChild(CdkPortal) portal!: CdkPortal;
  hidden = true;
  
  constructor(private appointmentService: AppointmentService, 
    private calendar: CurrentMonthService, 
    private overlay: Overlay,
    private trainHours: TrainingHoursService) {}
  static overlayRef: OverlayRef;
  month!: number;
  year!: number;
  train_hours: TrainHour[] = [];

  ngOnInit() {
    if (this.day == -1) {
      this.hidden = true
    }
    else {
      this.hidden = false
    }
    this.month = this.calendar.month;
    this.year = this.calendar.year;
    this.train_hours = this.trainHours.selectOnDate(new Date(this.year, this.month, this.day));
    
  }

  createAppointment(day: number) {
    // if (!this.appointmentService.active) {
    //   const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically(); 
    //   DayComponent.overlayRef = this.overlay.create({positionStrategy,
    //   });

    //   DayComponent.overlayRef.attach(this.portal);
    // } else {
    //   DayComponent.overlayRef.detach();
    // }
    // this.appointmentService.active = !this.appointmentService.active
  }

}
