import { CommonModule } from '@angular/common';
import { Component, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { CurrentMonthService } from '../current-month.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { AppointmentComponent } from "../appointment/appointment.component";

@Component({
    selector: 'app-day',
    standalone: true,
    imports: [CommonModule, PortalModule, AppointmentComponent],
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css'],
})
export class DayComponent {
  @Input() day!: number;
  @ViewChild(CdkPortal) portal!: CdkPortal;
  hidden = true;
  
  constructor(private appointmentService: AppointmentService, private calendar: CurrentMonthService, private overlay: Overlay) {}
  static overlayRef: OverlayRef;
  month!: number;
  year!: number;

  ngOnInit() {
    if (this.day == -1) {
      this.hidden = true
    }
    else {
      this.hidden = false
    }
    this.month = this.calendar.month + 1;
    this.year = this.calendar.year;
  }

  createAppointment(day: number) {
    if (!this.appointmentService.active) {
      console.log(day)
      DayComponent.overlayRef = this.overlay.create();
      console.log(this.year)
      console.log(this.month)
      console.log(this.day)

      DayComponent.overlayRef.attach(this.portal);
    } else {
      DayComponent.overlayRef.detach();
    }
    this.appointmentService.active = !this.appointmentService.active
    
  }

}
