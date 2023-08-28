import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {
  // private users: User[] = [];
  // private currentUser!: User;
  // private _profileUser!: User;

  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  private profileUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  users$: Observable<User[]> = this.usersSubject.asObservable();
  currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();
  profileUser$: Observable<User | null> =
    this.profileUserSubject.asObservable();

  // getUsers(): User[] {
  //   return this.users;
  // }

  addUser(user: User): void {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }

  deleteUser(id: number): void {
    const updatedUsers = this.usersSubject.value.filter(
      (user) => user.id !== id
    );
    this.usersSubject.next(updatedUsers);
  }

  updateUser(updateUserData: User): void {
    const index = this.usersSubject.value.findIndex(
      (user) => user.id === updateUserData.id
    );
    if (index !== -1) {
      const updatedUsers = [...this.usersSubject.value];
      updatedUsers[index] = updateUserData;
      this.usersSubject.next(updatedUsers);
    }
  }

  login(email: string, password: string): boolean {
    const user = this.usersSubject.value.find(
      (x) => x.email === email && x.password == password
    );
    if (user !== undefined) {
      this.currentUserSubject.next(user);
    }
    return user !== undefined;
  }

  logout() {
    this.currentUserSubject.next(null);
  }

  getUserByEmail(email: string): User | undefined {
    return this.usersSubject.value.find((x) => x.email === email);
  }

  public setCurrentUser(currentUser: User | null) {
    this.currentUserSubject.next(currentUser);
  }

  public setProfileUser(value: User | null) {
    this.profileUserSubject.next(value);
  }
}
