import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.css']
})
export class UsersManagerComponent implements OnInit {
  users: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadAllUsers();
  }
  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => { 
        this.loadAllUsers() 
    });
}

private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => { 
        this.users = users['results']; 
    });
}

}
