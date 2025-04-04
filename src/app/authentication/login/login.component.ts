import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GolobalConstants } from '../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
  
})
export class LoginComponent implements OnInit{
  hide = true;
  loginForm: any = FormGroup;
  resposeMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private snackbar: SnackbarService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GolobalConstants.emailRegex)]],
      password: [null, [Validators.required, Validators.pattern(GolobalConstants.passwordRegex)]]
    })
  }

  //handle submit action here
  login() {
    this.ngxService.start()
    var formData = this.loginForm.value;
    // var data = {
    //   email: formData.email,
    //   password: formData.password
    // }
    if (this.loginForm.valid) {
      var formData = this.loginForm.value;
      console.log(this.loginForm.value)
      this.router.navigate(['./admin/home/dashboard'])
      this.ngxService.stop();
      this.snackbar.success("Login Successfully.", "X")
    }
  }
}
