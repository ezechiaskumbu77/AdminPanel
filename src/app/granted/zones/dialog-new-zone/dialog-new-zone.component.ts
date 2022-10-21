import { PlaceByIdPipe } from './../../../utils/place-by-id.pipe';
import { Zone } from './../model/zone.model';
import { AddZone, PlacesLoaded, UpdateZone } from './../store/zones.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { AppState } from 'src/app/app.state';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, BehaviorSubject, forkJoin } from 'rxjs';
import { pairwise, switchMap, take } from 'rxjs/operators';
import { combineAll } from 'rxjs-compat/operator/combineAll';
import { LoadProvinces, TownsLoaded, LoadDistricts, LoadTowns, LoadPlaces, ZoneActionsType, ProvincesLoaded, DistrictsLoaded } from '../store/zones.actions';
import { Place } from '../model/place.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-new-zone',
  templateUrl: './dialog-new-zone.component.html',
  styleUrls: ['./dialog-new-zone.component.scss']
})
export class DialogNewZoneComponent implements OnInit {

  provinces$ = this._store.select((state: AppState) => state.zoneState.provinces)
  districts$ = this._store.select((state: AppState) => state.zoneState.districts)
  towns$ = this._store.select((state: AppState) => state.zoneState.towns)
  places$ = new BehaviorSubject<Place[]>([]);
  networkCall$ = this._store.select((state: AppState) => state.globalState.onProgress)
  selectedPlaces: Place[] = [];

  province = new FormControl('');
  district = new FormControl('');
  town = new FormControl('');
  place = new FormControl('');

  zone: Zone;

  zoneForm = new FormGroup({
    name: new FormControl('', Validators.required),
    priceSurcem: new FormControl('', Validators.required),
    priceSurcast: new FormControl('', Validators.required)
  })

  constructor(private placeFromId: PlaceByIdPipe, public modal: NgbActiveModal, private _store: Store<AppState>, private _cdr: ChangeDetectorRef, private _actions: Actions) { }


  ngOnInit() {
    this._store.dispatch(new LoadProvinces(""));

    this.province.valueChanges.subscribe(
      (v) => {
        this._store.dispatch(new LoadDistricts(v.code))
      }
    )
    this.district.valueChanges.subscribe(
      (v) => {
        this._store.dispatch(new LoadTowns(v.code))
      }
    )
    this.town.valueChanges.subscribe(
      (v) => {
        if (v != null && v != undefined) {

          if (v.children == null || v.children.length == 0) {
            this.places$.next([]);
            this.selectedPlaces.push(v.place);
          }
          else {
            this.places$.next(v.children)
            //this.place.setValue(v.children[0]);
          }
        }

        this._cdr.detectChanges();
      }
    )

    this.place.valueChanges
      .subscribe(
        v => { if (v != undefined && v != null) this.selectedPlaces.push(v) }
      )

    this.province.statusChanges.subscribe(
      v => this._cdr.detectChanges()
    )

    this.district.statusChanges.subscribe(
      v => this._cdr.detectChanges()
    )

    this.town.statusChanges.subscribe(
      v => this._cdr.detectChanges()
    )

    this.place.statusChanges.subscribe(
      v => this._cdr.detectChanges()
    )
    /*
        this.place.valueChanges.subscribe(
          (v)=>this._store.dispatch(new LoadPlaces({
            parent:this.town.v,
            search: this.place.value
          }))
        )
        */


    this._actions.pipe(
      ofType(ZoneActionsType.TOWNS_LOADED)
    ).subscribe(
      (act: TownsLoaded) => {
        let code = act.payload.length > 0 ? act.payload[0].code : "undefined";
        this._store.dispatch(new LoadPlaces(code));
        this._cdr.detectChanges();
      }
    )


    this._actions.pipe(
      ofType(ZoneActionsType.PROVINCES_LOADED)
    ).subscribe(
      (act: ProvincesLoaded) => {
        if (act.payload.length > 0) this.province.setValue(act.payload[0]);

        this._cdr.detectChanges();
      }
    )

    this._actions.pipe(
      ofType(ZoneActionsType.DISTRICTS_LOADED)
    ).subscribe(
      (act: DistrictsLoaded) => {
        if (act.payload.length > 0) this.district.setValue(act.payload[0]);

        this._cdr.detectChanges();
      }
    )

    if (this.zone != undefined) {
      this.zoneForm.patchValue(this.zone);
      this.selectedPlaces = <any>this.zone.listPlace.slice()
      /*
      forkJoin(this.zone.listPlace.slice().map(
        (id) => {
          console.log('id', id);
          return this.placeFromId.transform(id)
        }
      )).subscribe(
        v => {
          console.log(v)
          this.selectedPlaces = v
        }
      )
      */
    }
  }


  alreadySelected(pl: Place) {
    return this.selectedPlaces.findIndex(
      (p) => p.code == pl.code
    ) == -1 ? false : true;
  }

  removeFromSelected(sp: Place) {
    let index = this.selectedPlaces.findIndex(
      (p) => p.code == sp.code
    );
    if (index != -1) {
      this.selectedPlaces.splice(index, 1);
    }
  }

  createZone() {
    let currZone: Zone = { ...{}, ...this.zoneForm.value };
    currZone.listPlace = this.selectedPlaces;

    if (this.zone != undefined && this.zone._id != undefined) {
      currZone._id = this.zone._id;
      this._store.dispatch(new UpdateZone(currZone));
    }

    else this._store.dispatch(new AddZone(currZone));

    this._actions.pipe(
      ofType(ZoneActionsType.ZONE_ADDED, ZoneActionsType.ZONE_UPDATED),
      take(1)
    ).subscribe(
      v => this.modal.dismiss()
    )

  }

}
