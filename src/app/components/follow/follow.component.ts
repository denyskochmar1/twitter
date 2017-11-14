import { Component, OnInit } from '@angular/core';
import { SearchService } from "../../services/search.service";
import { PostService } from "../../services/post.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  public followed;
  public posts;
  public mainUser;
  public users;
  public followedPosts;
  public follow : boolean = true;
  public like : boolean = false;
  constructor(private search: SearchService,
              private userService: UserService,
              private postService: PostService,
              private router: Router) {
    this.users = JSON.parse(sessionStorage.getItem('users'));
    this.mainUser = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit() {
    if(JSON.parse(sessionStorage.getItem('authorized'))){
      this.postService.getPosts().subscribe((posts)=> {
        this.posts = posts;
        this.followed = this.search.findWhatYouWant(this.mainUser.followed, this.users, 'userid');
        this.followedPosts = this.search.followedPostsFunction(this.followed, this.posts);
        this.search.sortByDate(this.followedPosts);
      });
    }else{
      this.router.navigate( [''] );
    }
  }

  public followTrigger(e, userid) {
    e ? this.mainUser.followed.push(userid) : this.search.deleteUser(userid, this.mainUser);
    this.userService.setFollowers(this.mainUser.followed);
    sessionStorage.removeItem('user');
    let sessionUser = JSON.stringify(this.mainUser);
    sessionStorage.setItem('user', sessionUser);
  }


  public likeTrigger(e, userid,postlike){
    e ? postlike.push(userid) : this.search.deleteLike(userid, postlike);
  }
}
