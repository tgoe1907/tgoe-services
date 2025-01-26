import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-groups',
  imports: [NavigationComponent, RouterModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent {

}
