import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [NavigationComponent, RouterModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private userService: UserService) {
    this.user = new User(-1, "", "", new Date(), "");  
  }
  user: User;
  async ngOnInit(): Promise<void> {
    this.user = await this.userService.getUser() || new User(-1, "", "", new Date(), "");  
  }

  safe() {
    this.userService.updateUser(this.user);
  }
}
