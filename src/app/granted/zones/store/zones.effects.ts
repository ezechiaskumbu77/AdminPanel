import { Zone } from './../model/zone.model';
import { customEnvironment } from '../../../../environments/custom-environment';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { DistrictsLoaded, PlacesLoaded, ZoneActions, ZoneActionsType, ZonesLoaded, ProvincesLoaded, TownsLoaded, ZoneAdded, ZoneDeleted, ZoneUpdated } from './zones.actions';

@Injectable()
export class ZoneEffects {

  constructor(private http: HttpClient, private actions: Actions) { }

  @Effect()
  loadZone = this.actions.pipe(
    ofType(ZoneActionsType.LOAD_ZONES),
    switchMap(
      (action: ZoneActions) =>
        this.http.get<any>(customEnvironment.BASE_URL + '/zone', { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new ZonesLoaded(response.data));
            }
            )
          )
    )
  )
  @Effect()
  loadPlace = this.actions.pipe(
    ofType(
      ZoneActionsType.LOAD_DISTRICTS
      , ZoneActionsType.LOAD_TOWNS
      , ZoneActionsType.LOAD_PLACES
    ),
    switchMap(
      (action: ZoneActions) =>
        this.http.get<any>(customEnvironment.BASE_URL + '/place/?parent=' + action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              let obs;
              switch (action.type) {

                case ZoneActionsType.LOAD_DISTRICTS:
                  obs = of(new DistrictsLoaded(response.data));
                  break;

                case ZoneActionsType.LOAD_TOWNS:
                  obs = of(new TownsLoaded(response.data));
                  break;
                case ZoneActionsType.LOAD_PLACES:
                  obs = of(new PlacesLoaded(response.data));
                  break;
              }
              return obs
            }
            )
          )
    )
  )

  @Effect()
  loadProvinces = this.actions.pipe(
    ofType(ZoneActionsType.LOAD_PROVINCES),
    switchMap(
      (action: ZoneActions) =>
        this.http.get<any>(customEnvironment.BASE_URL + '/place/?type=P', { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new ProvincesLoaded(response.data));
            }
            )
          )
    )
  )

  @Effect()
  addZone = this.actions.pipe(
    ofType(ZoneActionsType.ADD_ZONE),
    switchMap(
      (action: ZoneActions) =>
        this.http.post<any>(customEnvironment.BASE_URL + '/zone', action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new ZoneAdded(response.data));
            }
            )
          )
    )
  )

  @Effect()
  updateZone = this.actions.pipe(
    ofType(ZoneActionsType.UPDATE_ZONE),
    switchMap(
      (action: ZoneActions) =>
        this.http.put<any>(customEnvironment.BASE_URL + '/zone/' + (<Zone>action.payload)._id, action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              if (response.success) {
                return of(new ZoneUpdated(<Zone>action.payload));
              } else return EMPTY;

            }
            )
          )
    )
  )

  @Effect()
  deleteZone = this.actions.pipe(
    ofType(ZoneActionsType.DELETE_ZONE),
    switchMap(
      (action: ZoneActions) =>
        this.http.delete<any>(customEnvironment.BASE_URL + '/zone/' + action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              console.log(response)
              if (response.success) {
                return of(new ZoneDeleted(<string>action.payload));
              } else return EMPTY
            }
            )
          )
    )
  )

  /*

  @Effect()
  loadPlaces = this.actions.pipe(
    ofType(ZoneActionsType.LOAD_PLACES),
    switchMap(
      (action: ZoneActions) =>
        this.http.get<any>(customEnvironment.BASE_URL + '/place/?search=' + action.payload, { headers: customEnvironment.headers })
          .pipe(
            switchMap((response: any) => {
              return of(new PlacesLoaded(response.data));
            }
            )
          )
    )
  )
  */
}
