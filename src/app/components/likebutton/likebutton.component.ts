import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-likebutton',
  templateUrl: './likebutton.component.html',
  styleUrls: ['./likebutton.component.css']
})
export class LikebuttonComponent implements OnInit {
  @Input() like;
  @Input() post;

  @Output() likeTrigger = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onLike(){
    this.like = !this.like;
    this.likeTrigger.emit(this.like);
  }

}
