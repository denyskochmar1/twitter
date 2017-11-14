import { Component, OnInit } from '@angular/core';
import { SearchService } from "../../services/search.service";
import { PostService } from "../../services/post.service";
import { UserService } from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public followed;
  public posts;
  public mainUser;
  public users;
  public followedPosts;
  public follow:boolean = false;
  public like:boolean = false;
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
        let myID = [];
        myID.push(this.mainUser.userid);
        let needUsersId = myID.concat(this.mainUser.followed);
        let needUsersPosts = this.users.filter(item=>{
          return needUsersId.indexOf(item.userid) < 0;
        });
        this.followedPosts = this.search.followedPostsFunction(needUsersPosts, this.posts);
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
