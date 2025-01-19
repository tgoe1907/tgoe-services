import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { AppointmentComponent } from "../appointment/appointment.component";
import { EventEmitter } from 'stream';

@Component({
    selector: 'app-day',
    standalone: true,
    imports: [CommonModule, AppointmentComponent],
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css']
})
export class DayComponent {
  @Input() day = 0;
  hidden = true;
  @Input() appointmentHidden = true;

  @Input() position = { top: '0px', left: '0px' };


  ngOnInit() {
    if (this.day == -1) {
      this.hidden = true
    }
    else {
      this.hidden = false
    }
  }

}
