import { Component } from '@angular/core';
import { MonthComponent } from 'src/app/calendar/month/month.component';

@Component({
  selector: 'app-main',
  imports: [MonthComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
