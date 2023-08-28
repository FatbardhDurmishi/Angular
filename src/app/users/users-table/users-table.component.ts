import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/userService';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Input() userType: string = '';
  arrowClassName: string = 'fa-solid fa-sort-down';
  arrayIsAscending: boolean = true;

  constructor(private userService: UserService, private router: Router) {}

  @Output() deleteUserId: EventEmitter<number> = new EventEmitter<number>();

  onDeleteUser(id: number, event: Event) {
    debugger;
    event.stopPropagation();

    this.deleteUserId.emit(id);
  }

  // deleteUser(id: number): void {
  //   debugger;
  //   this.userService.deleteUser(id);
  // }

  sortUsersByUsername(users: User[]) {
    if (users.length >= 2) {
      if (this.arrayIsAscending) {
        this.arrayIsAscending = !this.arrayIsAscending;
        this.arrowClassName = 'fa-solid fa-sort-up';
        users.sort((a, b) => b.userName.localeCompare(a.userName));
      } else {
        this.arrayIsAscending = !this.arrayIsAscending;
        this.arrowClassName = 'fa-solid fa-sort-down';
        users.sort((a, b) => a.userName.localeCompare(b.userName));
      }
    }
  }

  trackByUserId(index: number, user: User): number {
    return user.id; //
  }

  showProfile(user: User) {
    debugger;
    this.userService.setProfileUser(user);
    this.router.navigate(['/profile']);
  }
}
