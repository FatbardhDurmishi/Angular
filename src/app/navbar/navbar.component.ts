import { Component } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { UserService } from '../services/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private userService: UserService, private router: Router) {
    this.userService.currentUser$.subscribe((res) => {
      this.currentUser = res!;
    });
  }
  currentUser!: User | null;
  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    this.userService.setCurrentUser(null);
  }
}
