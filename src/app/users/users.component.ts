import { Component, Input } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  Users: User[];
  frontEndUsers: User[];
  backEndUsers: User[];
  fullStackUsers: User[];

  constructor(private userService: UserService) {
    this.Users = this.userService.getUsers();
    this.frontEndUsers = this.Users.filter(
      (user) => user.jobPosition.toLowerCase() === 'frontend'
    );

    this.backEndUsers = this.Users.filter(
      (user) => user.jobPosition.toLowerCase() === 'backend'
    );
    this.fullStackUsers = this.Users.filter(
      (user) => user.jobPosition.toLowerCase() === 'fullstack'
    );
  }
}
