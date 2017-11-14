import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(){
    return this.http.get('assets/data/posts.json');
  }
}
