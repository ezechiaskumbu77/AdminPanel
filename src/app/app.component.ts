import { tap } from 'rxjs/internal/operators/tap';
import { CancelProgress, GlobalActionsType } from './globale-store/global.actions';
import { Actions, ofType } from '@ngrx/effects';
import { SelectOnProgress } from './globale-store/global.reducer';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { SetLogedInUser } from './user/login/store/user.actions';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'ppc-admin';
  progress$ = this.store.select(SelectOnProgress);

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef, private actions: Actions) {

  }
  ngAfterViewInit(): void {
    this.actions.pipe(
      ofType(GlobalActionsType.SET_PROGESS)
    ).subscribe(
      (act) => this.cdr.detectChanges()
    )

  }
  ngOnInit(): void {
    let logedInUserStr = localStorage.getItem('user');
    if (logedInUserStr != null) {
      this.store.dispatch(
        new SetLogedInUser(JSON.parse(logedInUserStr))
      )
    }
  }



}
