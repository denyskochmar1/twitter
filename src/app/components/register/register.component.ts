import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public users;
  public password;
  public fname;
  public lname;
  public login;
  public email;


  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data)=> this.users = data);
  }

  signUp(){
    let signUpForm = {
      fname: this.fname,
      lname: this.lname,
      login: this.login,
      email: this.email,
      password: this.password
    };
    let newArr = this.createUser(signUpForm);
    this.userService.messageSource.next(newArr);
  }

  private createUser(obj){
    obj.image = '../../../assets/images/wally.jpg';
    obj.followers = [];
    obj.followed = [];
    obj.posts = [];
    obj.likes = [];
    obj.online = true;
    obj.userid = this.generateId();
    this.users.push(obj);
    return this.users;
  }

  private generateId(){
    let S4 = ()=> {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }
}
