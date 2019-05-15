import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  errorMsg: string;

  fields = [
    // {
    //   key: 'username',
    //   name: 'username',
    //   type: 'text',
    // },
    {
      key: 'email',
      name: 'Email address',
      type: 'email',
    },
    {
      key: 'dob',
      name: 'Date of Birth',
      type: 'text',
    },
    {
      key: 'password',
      name: 'Password',
      type: 'password',
    },
    // {
    //   key: 'confirmPassword',
    //   name: 'confirm Password',
    //   type: 'password',
    // },
    {
      key: 'rememberMe',
      name: 'Remember me',
      type: 'checkbox',
      excludeFromFormGroup: true,
    },
  ];

  constructor(private authService: AuthService, private router: Router, public appService: AppService) {
  }

  signUp(formData) {
    this.authService.signUp(formData)
      .then(resolve => {
        // this.router.navigate(['home']);
        //  window.location.reload();
      })
      .catch(error => this.errorMsg = error.message);
  }

  ngOnInit(): void {
    this.appService.pageTitle = 'Register';
  }
}
