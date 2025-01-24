import { Component, Input } from '@angular/core';
import { CurrentMonthService } from '../current-month.service';
import { AppointmentService } from '../appointment.service';
import { SportGroupsService } from 'src/app/services/sport-groups.service';
import { NgFor, NgIf } from '@angular/common';
import { TrainHour } from 'src/app/models/train-hour';
import { FormsModule } from '@angular/forms';
import { TrainingHoursService } from 'src/app/services/training-hours.service';

@Component({
  selector: 'app-appointment',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  @Input() date: Date | null = null;
  @Input() trainHour: TrainHour | null = null;
  constructor(private calender: CurrentMonthService, appointment: AppointmentService, 
    private groupService: SportGroupsService, private trainHourService: TrainingHoursService) {}
  displayDay!: string;
  displayMonth!: string;
  displayYear!: string;
  startTime!: string;
  endTime!: string
  groupList = this.groupService.getDictAsList();
  groupId!: number;

  ngOnInit() {
    if (this.date != null) {
      this.prepare_date_data(this.date)
    } 
    if (this.trainHour != null) {
      this.prepare_date_data(this.trainHour.date)
      this.startTime = this.trainHour.start;
      this.endTime = this.trainHour.end;
      this.groupId = this.trainHour.group.id;
    }

  }
  
  prepare_date_data(date: Date) {
    const month = date.getMonth() + 1;
    this.displayDay = date.getDate() >= 10 ? date.getDate().toString() : "0" + date.getDate().toString();
    this.displayMonth = month >= 10 ? month.toString() : "0" + month.toString();
    this.displayYear = date.getFullYear().toString();
  }

  safe_data(date: string, start_time: string, end_time: string, group_id: string) {
    console.log(date)
    console.log(start_time)
    console.log(end_time)
    console.log(group_id)
    if (this.trainHour == null) {
      const group = this.groupService.getGroupById(parseInt(group_id));
      const newDate = new Date(date);
      const new_train_hour = new TrainHour(-1, group, newDate, start_time, end_time);
      this.trainHourService.addTrainHour(new_train_hour);
    } else {
      this.trainHour.group = this.groupService.getGroupById(parseInt(group_id));
      this.trainHour.start = start_time;
      this.trainHour.end = end_time;
      this.trainHour.date = new Date(date);
      this.trainHourService.updateTrainHour(this.trainHour);
    }
  }

  delete_entry() {
    if (this.trainHour != null) {
      this.trainHourService.deleteTrainHour(this.trainHour);
    }
  }
}
