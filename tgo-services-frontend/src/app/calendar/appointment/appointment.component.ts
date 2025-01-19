import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-appointment',
    imports: [NgStyle],
    standalone: true,
    templateUrl: './appointment.component.html',
    styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
    @Input() position = { top: '40px', left: '40px' };
}
