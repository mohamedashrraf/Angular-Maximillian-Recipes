import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error!: string ;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password=form.value.password;
    this.isLoading = true;
    if(this.isLoginMode){
      this.authService.login(email,password).subscribe(
        resData=>{
          console.log(resData);
          this.isLoading=false;
          this.router.navigate(['/recipes']);
      },errorMessage =>{
        console.log((errorMessage));
        this.error=errorMessage;
        this.isLoading=false;

      })
    }else{
      this.authService.signUp(email,password).subscribe(
        resData=>{
          console.log(resData);
          this.isLoading=false;
          this.router.navigate(['/recipes']);
      },errorMessage =>{
        console.log((errorMessage));
        this.error=errorMessage;
        this.isLoading=false;

      })
    }

    //طريقة تانية
    // let authObs: Observable<AuthResponseData>;

    // this.isLoading = true;

    // if (this.isLoginMode) {
    //   authObs = this.authService.login(email, password);
    // } else {
    //   authObs = this.authService.signup(email, password);
    // }

    // authObs.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   errorMessage => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }



}
