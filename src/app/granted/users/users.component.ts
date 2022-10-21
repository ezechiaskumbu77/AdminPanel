import { CollaborationStatusEnum } from './../../model/collaboration-status.enum';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { LoadUsers, SelectUser, SetUserCategory } from 'src/app/user/login/store/user.actions';
import { selectSelectedUser, selectUsers } from 'src/app/user/login/store/user.reducer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogCreateUserComponent } from './dialog-create-user/dialog-create-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$ = this.store.select(selectUsers);
  category$ = this.store.select((state: AppState) => state.userState.category);

  selectedUser$ = this.store.select(selectSelectedUser);
  @ViewChild('pending', { static: false }) pending: ElementRef<HTMLButtonElement>;
  @ViewChild('agreed', { static: false }) agreed: ElementRef<HTMLButtonElement>;
  @ViewChild('rejected', { static: false }) rejected: ElementRef<HTMLButtonElement>;
  @ViewChild('banned', { static: false }) banned: ElementRef<HTMLButtonElement>;
  dialogPrompted: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this._modalService.hasOpenModals())
    this.category$.pipe(take(1)).subscribe(
      (cat) => (<ElementRef<HTMLButtonElement>>this[cat]).nativeElement.focus()
    )
  }


  constructor(private store: Store<AppState>, private _modalService: NgbModal) { }
  ngAfterViewInit(): void {
    this.category$.subscribe(
      (cat) => (<ElementRef<HTMLButtonElement>>this[cat]).nativeElement.focus()
    )
  }

  ngOnInit() {
    this.category$.subscribe(
      (cat) => this.store.dispatch(new LoadUsers(cat))
    )

  }

  select(userId: string) {
    this.store.dispatch(new SelectUser(userId))
  }

  setUserCategory(category: CollaborationStatusEnum) {
    this.store.dispatch(new SetUserCategory(category));
  }

  openCommercialDialog(){
    this._modalService.open(DialogCreateUserComponent)
  }
}
