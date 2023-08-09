import { Component } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  Users: User[] = [];
  frontEndUsers: User[] = [];
  backEndUsers: User[] = [];
  fullStackUsers: User[] = [];
  arrowClassNames: string[] = [
    'fa-solid fa-sort-down',
    'fa-solid fa-sort-down',
    'fa-solid fa-sort-down',
  ];
  sortingStates: boolean[] = [true, true, true];

  constructor(private userService: UserService) {
    this.updateUserData();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    this.updateUserData();
  }

  private updateUserData(): void {
    this.Users = this.userService.getUsers();
    this.frontEndUsers = this.Users.filter(
      (user) => user.jobPosition.toLowerCase() === 'frontend'
    ).sort((a, b) => a.userName.localeCompare(b.userName));
    this.backEndUsers = this.Users.filter(
      (user) => user.jobPosition.toLowerCase() === 'backend'
    ).sort((a, b) => a.userName.localeCompare(b.userName));
    this.fullStackUsers = this.Users.filter(
      (user) => user.jobPosition.toLowerCase() === 'fullstack'
    ).sort((a, b) => a.userName.localeCompare(b.userName));
  }

  // sortUsersByUsername(users: User[]) {
  //   debugger;
  //   if (users.length >= 2) {
  //     if (arrayIsAsscending) {
  //       this.arrowClassName = 'fa-solid fa-sort-up';
  //       users.sort((a, b) => b.userName.localeCompare(a.userName));
  //     } else {
  //       this.arrowClassName = 'fa-solid fa-sort-down';
  //       users.sort((a, b) => a.userName.localeCompare(b.userName));
  //     }
  //     this.arrayIsAsscending = !arrayIsAsscending;
  //   }
  // }

  sortUsersByUsername(users: User[], tableIndex: number) {
    if (users.length >= 2) {
      if (this.sortingStates[tableIndex]) {
        this.arrowClassNames[tableIndex] = 'fa-solid fa-sort-up';
        users.sort((a, b) => b.userName.localeCompare(a.userName));
      } else {
        this.arrowClassNames[tableIndex] = 'fa-solid fa-sort-down';
        users.sort((a, b) => a.userName.localeCompare(b.userName));
      }
      this.sortingStates[tableIndex] = !this.sortingStates[tableIndex];
    }
  }

  trackByUserId(index: number, user: User): number {
    return user.id; //
  }
}
