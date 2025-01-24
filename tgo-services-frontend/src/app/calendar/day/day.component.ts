import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { CurrentMonthService } from '../current-month.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { AppointmentComponent } from "../appointment/appointment.component";
import { TrainHour } from 'src/app/models/train-hour';
import { TrainingHoursService } from 'src/app/services/training-hours.service';
import { CalendarEntryComponent } from '../calendar-entry/calendar-entry.component';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-day',
    standalone: true,
    imports: [CommonModule, PortalModule, AppointmentComponent, NgFor, CalendarEntryComponent, NgIf],
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css'],
})
export class DayComponent {
  @Input() day!: number;
  date!: Date;
  @ViewChild(CdkPortal) portal!: CdkPortal;
  hidden = true;
  
  constructor(private appointmentService: AppointmentService, 
    private calendarService: CurrentMonthService, 
    private overlay: Overlay,
    private trainHourService: TrainingHoursService) {}
  overlayRef: OverlayRef | null = null;
  month!: number;
  year!: number;
  trainHours$: Observable<TrainHour[]> = of([]);

  ngOnInit() {
    if (this.day == -1) {
      this.hidden = true
    }
    else {
      this.hidden = false
    }
    this.month = this.calendarService.month;
    this.year = this.calendarService.year;
    this.date = new Date(this.calendarService.year, this.calendarService.month, this.day);
    this.trainHours$ = this.trainHourService.selectOnDate(this.date);
  }


  createAppointment(day: number) {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically(); 
    this.overlayRef = this.overlay.create({positionStrategy,
      hasBackdrop: true
    });

    this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => {this.close()});
  }
  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
