import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Component, Input, ViewChild } from '@angular/core';
import { TrainHour } from 'src/app/models/train-hour';
import { AppointmentService } from '../appointment.service';
import { AppointmentComponent } from '../appointment/appointment.component';
import { SportGroupsService } from 'src/app/services/sport-groups.service';

@Component({
  selector: 'app-calendar-entry',
  imports: [PortalModule, AppointmentComponent],
  templateUrl: './calendar-entry.component.html',
  styleUrl: './calendar-entry.component.css'
})
export class CalendarEntryComponent {
  @Input() trainHour!: TrainHour;  
  @ViewChild(CdkPortal) portal!: CdkPortal;
  overlayRef: OverlayRef | null = null;
  group_name: string = ""
  constructor(private overlay: Overlay, private appointmentService: AppointmentService, private groupService: SportGroupsService) {}

  ngOnInit() {
    this.group_name = this.groupService.getGroupById(this.trainHour.group).name
  }

  showCalendarEntry(event: MouseEvent) {
    event.stopPropagation();
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
