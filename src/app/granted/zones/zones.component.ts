import { GenericConfirmComponent } from './../../generic-confirm/generic-confirm.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { LoadUsers } from 'src/app/user/login/store/user.actions';
import { DialogNewZoneComponent } from './dialog-new-zone/dialog-new-zone.component';
import { DeleteZone, LoadZones, SelectZone, SetZoneCategory } from './store/zones.actions';
import { selectSelectedZone, selectZones } from './store/zones.reducer';
import { Zone } from './model/zone.model';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit {

  zones$ = this.store.select(selectZones);
  selectedZone$ = this.store.select(selectSelectedZone);

  constructor(private store: Store<AppState>, private _modalService: NgbModal) { }
  ngOnInit(): void {
    this.store.dispatch(new LoadZones(""));
  }

  select(zoneId: string) {
    this.store.dispatch(new SelectZone(zoneId))
  }

  openNewZoneDialog() {
    this._modalService.open(DialogNewZoneComponent);
  }

  removeZone(zone: Zone) {
    let par = this;
    let _mr: NgbModalRef = this._modalService.open(
      GenericConfirmComponent,
      {}
    );
    _mr.result.then(
      (v) => {
        if (v) {
          par.store.dispatch(new DeleteZone(zone._id))
        }
      }
    );
    _mr.componentInstance.title = `Voulez vous vraiment supprimer la zone ${zone.name} ?`
    _mr.componentInstance.description = `Toutes les informations y relatives seront également supprimées!`

  }

  editZone(sz: Zone) {
    this._modalService.open(DialogNewZoneComponent).componentInstance.zone = sz
  }

}
