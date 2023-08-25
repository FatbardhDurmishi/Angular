import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './userService';
import { User } from '../interfaces/interfaces';

@Injectable()
export class UsersGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(): boolean {
    var currentUser!: User;
    this.userService.currentUser$.subscribe((res) => {
      currentUser = res!;
    });
    if (currentUser != null) {
      if (currentUser.role === 'Admin') {
        return true;
      } else {
        this.router.navigate(['/profile']);
        return false;
      }
    }
    return false;
  }
}
