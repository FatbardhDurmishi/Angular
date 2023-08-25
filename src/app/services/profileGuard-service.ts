import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './userService';
import { User } from '../interfaces/interfaces';

@Injectable()
export class ProfileGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(): boolean {
    var currentUser!: User;
    var profileUser!: User;
    this.userService.currentUser$.subscribe((res) => {
      currentUser = res!;
    });
    this.userService.profileUser$.subscribe((res) => {
      profileUser = res!;
    });
    console.log(currentUser, 'currentuser');
    console.log(profileUser, 'profileuser');
    if (currentUser === null && profileUser === null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
