import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AuthenticationService } from '../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  userform: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, public http: HttpClient, private authenticationService: AuthenticationService, private route: ActivatedRoute,) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {

    this.userform = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),


    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.userform.controls;
  }


  btnClick() {
    this.router.navigateByUrl('/register');
  };

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userform.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data:any)=> {
          if(data.success==true){
            this.router.navigate(['/Dashboard']);
          console.log("check", data)
          }
          else if (data.success==false){
            alert("Invalid Credentials")
          }

        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
