import { Component, Input, ViewChild } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { NgFor } from '@angular/common';
import { AppointmentService } from '../appointment.service';
import { CurrentMonthService } from '../current-month.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

@Component({
    selector: 'app-week',
    imports: [DayComponent, NgFor, PortalModule],
    standalone: true,
    templateUrl: './week.component.html',
    styleUrls: ['./week.component.css']
})
export class WeekComponent {
  constructor(private appointmentService: AppointmentService, private calendar: CurrentMonthService, private overlay: Overlay) { }
  @ViewChild(DayComponent) day!: DayComponent;
  @Input() week: number[] = [1,2,3,4,5,6,7]

}
