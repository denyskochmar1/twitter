import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { FollowComponent } from './components/follow/follow.component';
import { MypostsComponent } from './components/myposts/myposts.component';

import { UserService } from './services/user.service'
import {PostService} from "./services/post.service";
import {SearchService} from "./services/search.service";
import { FollowbuttonComponent } from './components/followbutton/followbutton.component';
import { LikebuttonComponent } from './components/likebutton/likebutton.component';

export const HOMEROUTES: Routes = [
  { path : 'news', component : NewsComponent },
  { path : 'follow', component : FollowComponent },
  { path : 'myposts', component : MypostsComponent }
];

export const ROUTES: Routes = [
  { path : '', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'home', component : HomeComponent, children: HOMEROUTES }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NewsComponent,
    FollowComponent,
    MypostsComponent,
    FollowbuttonComponent,
    LikebuttonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES )
  ],
  providers: [UserService, PostService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
