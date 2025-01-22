import { Component, Input } from '@angular/core';
import { CurrentMonthService } from '../current-month.service';
import { AppointmentService } from '../appointment.service';
import { SportGroupsService } from 'src/app/sport-groups.service';
import { NgFor } from '@angular/common';
import { TrainHour } from 'src/app/models/train-hour';

@Component({
  selector: 'app-appointment',
  imports: [NgFor],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  @Input() day!: number;
  @Input() month!: number;
  @Input() year!: number;
  //@Input() trainHour: TrainHour;
  constructor(private calender: CurrentMonthService, appointment: AppointmentService, private group_service: SportGroupsService) {

  }
  ngOnInit() {
    this.display_day = this.day >= 10 ? this.day.toString() : "0" + this.day.toString();
    this.display_month = this.month >= 10 ? this.month.toString() : "0" + this.month.toString();
    this.display_year = this.year.toString();
  }
  display_day!: string;
  display_month!: string;
  display_year!: string;
  group_list = this.group_service.sport_group_list;

}
