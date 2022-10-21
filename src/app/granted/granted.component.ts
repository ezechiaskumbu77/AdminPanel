import { selectLogedInUser } from './../user/login/store/user.reducer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-granted',
  templateUrl: './granted.component.html',
  styleUrls: ['./granted.component.scss']
})
export class GrantedComponent implements OnInit {

  logedInUser$ = this.store.select(selectLogedInUser);

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() { }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }

}
