import { Component } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  frontEndUsers: User[] = [];
  backEndUsers: User[] = [];
  fullStackUsers: User[] = [];
  // arrowClassNames: string[] = [
  //   'fa-solid fa-sort-down',
  //   'fa-solid fa-sort-down',
  //   'fa-solid fa-sort-down',
  // ];
  // sortingStates: boolean[] = [true, true, true];

  constructor(private userService: UserService) {
    this.updateUserData();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    this.updateUserData();
  }

  private updateUserData(): void {
    this,
      this.userService.users$.subscribe((res) => {
        this.users = res;
      });
    this.frontEndUsers = this.users
      .filter(
        (user) =>
          user.jobPosition.toLowerCase() === 'frontend' && user.role !== 'Admin'
      )
      .sort((a, b) => a.userName.localeCompare(b.userName));
    this.backEndUsers = this.users
      .filter(
        (user) =>
          user.jobPosition.toLowerCase() === 'backend' && user.role !== 'Admin'
      )
      .sort((a, b) => a.userName.localeCompare(b.userName));
    this.fullStackUsers = this.users
      .filter(
        (user) =>
          user.jobPosition.toLowerCase() === 'fullstack' &&
          user.role !== 'Admin'
      )
      .sort((a, b) => a.userName.localeCompare(b.userName));
  }

  // sortUsersByUsername(users: User[], tableIndex: number) {
  //   if (users.length >= 2) {
  //     if (this.sortingStates[tableIndex]) {
  //       this.arrowClassNames[tableIndex] = 'fa-solid fa-sort-up';
  //       users.sort((a, b) => b.userName.localeCompare(a.userName));
  //     } else {
  //       this.arrowClassNames[tableIndex] = 'fa-solid fa-sort-down';
  //       users.sort((a, b) => a.userName.localeCompare(b.userName));
  //     }
  //     this.sortingStates[tableIndex] = !this.sortingStates[tableIndex];
  //   }
  // }

  // trackByUserId(index: number, user: User): number {
  //   return user.id; //
  // }
}
