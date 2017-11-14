import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-followbutton',
  templateUrl: './followbutton.component.html',
  styleUrls: ['./followbutton.component.css']
})
export class FollowbuttonComponent implements OnInit {
  @Input() follow;

  @Input() userId;

  @Output() followTrigger = new EventEmitter();
  constructor(private userService: UserService
              ) { }

  ngOnInit() {

      this.userService.getFollowers().subscribe((followersIds) => {
        this.follow = false;
        followersIds.forEach((id) => {
          if (this.userId === id) {
            this.follow = true;
          }
        });
      });


  }

  onFollow() {
    this.follow = !this.follow;
    this.followTrigger.emit(this.follow);
  }
}
