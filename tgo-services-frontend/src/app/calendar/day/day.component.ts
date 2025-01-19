import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-day',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css']
})
export class DayComponent {
  @Input() day = 0;

}
