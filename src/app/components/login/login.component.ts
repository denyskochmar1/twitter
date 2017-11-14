import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users;
  public newUsers;
  public login;
  public password;
  public invalid : boolean = false;
  constructor(private userService: UserService,
              private router: Router) {
    this.userService.messageSource.subscribe((mess)=>{this.newUsers = mess});
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data)=> {this.users = data;});
  }

  public signIn(){
    let mainArray = [];
    Array.isArray(this.newUsers) ? mainArray = this.newUsers : mainArray = this.users;
    let mainForm = {
      login : this.login,
      password : this.password
    };
    mainArray.forEach((user)=>{
      if(user.login === mainForm.login && user.password === mainForm.password){
        this.invalid = false;
        let sessionsers = JSON.stringify(mainArray);
        let sessionUser = JSON.stringify(user);
        sessionStorage.setItem('users', sessionsers);
        sessionStorage.setItem('authorized', 'true');
        sessionStorage.setItem('user', sessionUser);
        this.router.navigate( ['home','myposts'] );
      }else{
        // sessionStorage.setItem('authorized', 'false');
        this.invalid = true;
      }
    });
  }
}
