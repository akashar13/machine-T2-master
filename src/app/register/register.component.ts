import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  h: any;
  fil: any;
  a: Observable<Object>;


  constructor(private fb: FormBuilder, public http: HttpClient) { }
  ngOnInit(): void {


  }


  userprofileform = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    empid: new FormControl('', [Validators.required, Validators.minLength(4)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(10), Validators.maxLength(10)]),

    designation: new FormControl('', [Validators.required, Validators.minLength(2)]),
    address: new FormControl('', [Validators.required, Validators.minLength(2)]),

  })
  get f() {
    return this.userprofileform.controls;
  }

  onsubmit(data) {

    this.http.post('http://technical.test.prvak.co.in/api/employeeregister', data).subscribe((res: any) => {
      console.log("res", res)
      if(res.success==true){
        return alert("Sign Up Successful")
      }
    }

    )

  }
}
