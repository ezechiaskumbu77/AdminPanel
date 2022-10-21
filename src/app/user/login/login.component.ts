import { UserActionsType, UserLoginAction } from './store/user.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required])
  });




  constructor(private store: Store<AppState>, public actions: Actions, public router: Router) { }

  ngOnInit() {
    this.actions.pipe(
      ofType(UserActionsType.SET_LOGED_IN_USER)
    ).subscribe(
      (action) => {
        this.router.navigateByUrl('granted')
      }
    )
  }

  procedLogin() {
    this.store.dispatch(
      new UserLoginAction(
        this.loginForm.value
      )
    )
  }

}
