import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor() { }
  public findWhatYouWant(needItems, items, param){
    return needItems.map(itemArr=>{
      return items.find(item=>{
        return item[param] === itemArr
      });
    });
  }
  public findUser(userid, arrayusers){
    return arrayusers.find(item=>{
      return item.userid === userid;
    });
  }

  public sortByDate(array){
    array.sort(function(a,b){
      return +new Date(b.date) - +new Date(a.date);
    });
  }

  public followedPostsFunction(followed, posts){
    let arrOfNeedPosts = [].concat.apply([], followed.map(item =>
        item.posts.map(elem => (elem)))
    );
    let allPosts = this.findWhatYouWant(arrOfNeedPosts, posts, 'postid');
    return allPosts.map(post=>{
      return {
        comments: post.comments,
        date: post.date,
        message: post.message,
        postlike: post.postlike,
        user: this.findUser(post.userpostid, followed)
      }
    });
  }

  public deleteUser(userid, user) {
    if (user.followed.indexOf(userid) !== -1) {
      user.followed.splice(user.followed.indexOf(userid), 1);
    }
  }
  public deleteLike(userid, post){
    post.splice(post.indexOf(userid), 1);
  }
}
