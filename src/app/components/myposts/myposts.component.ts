import { Component, OnInit } from '@angular/core';
import { PostService } from "../../services/post.service";
import { SearchService } from "../../services/search.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
  public users;
  public mainUser;
  public posts;
  public userPosts;
  public like : boolean = false;
  public newPost : string = '';
  public newComment : string = '';
  constructor(private postService: PostService,
              private search: SearchService,
              private router: Router) {
    this.users = JSON.parse(sessionStorage.getItem('users'));
    this.mainUser = JSON.parse(sessionStorage.getItem('user'));
  }

  ngOnInit() {
      this.postService.getPosts().subscribe((posts)=> {
        this.posts = posts;
        this.userPosts = this.search.findWhatYouWant(this.mainUser.posts, this.posts, 'postid');
        this.search.sortByDate(this.userPosts);
      });
  }
  public create() {
    let newPostItem = {
      message: this.newPost,
      date: new Date(),
      postlike: [],
      userpostid: this.mainUser.userid,
      postid: this.posts.length + 1,
      comments: []
    };
    this.userPosts.push(newPostItem);
    this.newPost = '';
    this.search.sortByDate(this.userPosts);
  }

  public createComment(post){
    // console.log(comm);
    let newCommentItem = {
      message: this.newComment,
      date: new Date(),
      userpostid: this.mainUser.userid
    };
    post.comments.push(newCommentItem);
    this.newComment = '';
    this.search.sortByDate(post.comments);
  }

  public likeTrigger(e, userid, postlike){
    e ? postlike.push(userid) : this.search.deleteLike(userid, postlike);
  }
}
