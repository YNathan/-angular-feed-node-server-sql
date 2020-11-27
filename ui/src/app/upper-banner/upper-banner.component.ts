import { Component, OnInit } from '@angular/core';
import { User } from '../_models';

@Component({
  selector: 'upper-banner',
  templateUrl: './upper-banner.component.html',
  styleUrls: ['./upper-banner.component.css']
})
export class UpperBannerComponent implements OnInit {
  currentUser: User;
  constructor() {
    if(this.currentUser != null){}
    setInterval(()=> this.readCurrentUserFromLocalStorage(),1000);

  }

  ngOnInit() {
  }

  readCurrentUserFromLocalStorage(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
