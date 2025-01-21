import { Component, Input } from '@angular/core';
import { CurrentMonthService } from '../current-month.service';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment',
  imports: [],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  @Input() day!: number;
  @Input() month!: number;
  @Input() year!: number;
  constructor(private calender: CurrentMonthService, appointment: AppointmentService) {

  }
  ngOnInit() {
    this.display_day = this.day >= 10 ? this.day.toString() : "0" + this.day.toString();
    this.display_month = this.month >= 10 ? this.month.toString() : "0" + this.month.toString();
    this.display_year = this.year.toString();
  }
  display_day!: string;
  display_month!: string;
  display_year!: string;

}
