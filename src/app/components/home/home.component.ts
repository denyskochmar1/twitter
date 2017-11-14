import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user.service";
import { SearchService } from "../../services/search.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts;
  public users;
  public mainUser;
  public peopleOnline;
  public followed;
  constructor(private postService:PostService,
              private userService: UserService,
              private search: SearchService,
              private router: Router) {
    this.users = JSON.parse(sessionStorage.getItem('users'));
    this.mainUser = JSON.parse(sessionStorage.getItem('user'));
    this.userService.setFollowers(this.mainUser.followed);
  }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('authorized'))){
      this.userService.getFollowers().subscribe((followedPeople) => {
        this.followed = followedPeople;
        this.peopleOnline = this.search.findWhatYouWant(this.followed, this.users, 'userid');
      });
    }else{
      this.router.navigate( [''] );
    }

  }

  public logOut(){
    sessionStorage.setItem('authorized', 'false');
    this.router.navigate( [''] );
  }
}
