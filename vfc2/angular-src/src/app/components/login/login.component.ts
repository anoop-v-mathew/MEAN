import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private _flashMessagesService: FlashMessagesService,
    private _AuthService: AuthService, 
    private router: Router) { }

  ngOnInit() { }

  onSubmit(formValue: any){
    // put it inside of onSubmit() method
    let flashMsg = 'You are now logged in!';
    let cssCls = 'alert-success';
    let target = 'customer';
    const flashMessagesService = this._flashMessagesService;
    const rt = this.router;

    const user = {
      //userDisplayName: formValue.name,
      username: formValue.email,
      password: formValue.password
    }
    //required fields
    this._AuthService.login(user).subscribe(data => {
      if(data.success){
        // console.log(JSON.stringify(user));
        // console.log('your registred');
        // console.log(data);

        for(var i = 0; i < data.usertype.length; i ++){
          console.log(data.usertype[i]);
          if(data.usertype[i] == 'admin'){
            target = 'admin';
          }
          if(data.usertype[i] == 'vendor'){
            target = 'vendor';
          }
        }
      } else {
        flashMsg = 'Error: '+data.msg;
        cssCls = 'alert-danger';
        target = 'Login';;
      }
      flashMessagesService.show(flashMsg, { cssClass: cssCls, timeout: 3000 });
      rt.navigate([target]);
    });
  }
}
