import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  messageSource: BehaviorSubject<any> = new BehaviorSubject({});
  usersSource: BehaviorSubject<any> = new BehaviorSubject({});
  mainUser: BehaviorSubject<any> = new BehaviorSubject({});
  private followers$: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get('assets/data/users.json');
  }

  public setFollowers(followers) {
    this.followers$.next(followers);
  }
  public getFollowers() {
    return this.followers$;
  }
}
