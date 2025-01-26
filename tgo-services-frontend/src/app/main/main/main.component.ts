import { Component } from '@angular/core';
import { MonthComponent } from 'src/app/calendar/month/month.component';
import { NavigationComponent } from "../navigation/navigation.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [MonthComponent, NavigationComponent, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
