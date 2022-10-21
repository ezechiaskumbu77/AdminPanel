import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { AddUser, UserActionsType } from 'src/app/user/login/store/user.actions';

@Component({
  selector: 'app-dialog-create-user',
  templateUrl: './dialog-create-user.component.html',
  styleUrls: ['./dialog-create-user.component.scss']
})
export class DialogCreateUserComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
    role: new FormControl('user', Validators.required),
    address: new FormControl('', Validators.required),
    sex: new FormControl('M', Validators.required),
    status: new FormControl('agreed', Validators.required),
    isACtive: new FormControl('true', Validators.required),
  })

  constructor(public modal: NgbActiveModal, private _store: Store<AppState>, private _cdr: ChangeDetectorRef, private _actions: Actions) { }

  ngOnInit() {
    this._actions.pipe(
      ofType(UserActionsType.USER_ADDED),
      take(1)
    ).subscribe(
      u=>this.modal.close()
    )
  }

  createCommercial(){
    this._store.dispatch(
      new AddUser(this.userForm.value)
    )
    
  }

}
