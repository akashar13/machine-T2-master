import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  data: any;

  constructor(private http: HttpClient,private router:Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://technical.test.prvak.co.in/api/login', { username, password })
      .pipe(map(user => {
        // user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {

    this.data = JSON.parse(localStorage.getItem('currentUser'))
    this.currentUserSubject.next(null);
    const username = this.data.data[0].login_username;
    const authkey = this.data.data[0].auth_key;
    // console.log("local check",this.data.data[0].login_username,this.data.data[0].auth_key)
    this.http.post("http://technical.test.prvak.co.in/api/logout", { username, authkey }).subscribe((res: any) => {
      console.log("logout", res)
      if(res.success==true){
        this.router.navigateByUrl('/login')

      }
    })
  }
}
