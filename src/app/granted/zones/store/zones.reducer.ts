import { AppState } from './../../../app.state';
import { act } from '@ngrx/effects';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { Place } from '../model/place.model';
import { Zone } from '../model/zone.model';
import { ZoneActions, ZoneActionsType, PlacesLoaded } from './zones.actions';
import { sortByEdit } from 'src/app/utils/sort-by-edit';
import { nonDeleted } from 'src/app/utils/non-deleted';

export interface ZoneState {
  zones: Zone[],
  selectedZone: string,
  category: CollaborationStatusEnum,
  provinces: Place[],
  districts: Place[],
  places: Place[],
  towns: Place[]
}

export const initialState: ZoneState = {
  zones: [],
  selectedZone: null,
  category: CollaborationStatusEnum.AGREED,
  provinces: [],
  districts: [],
  places: [],
  towns: []
}

export const selectZones = (state: AppState) => state.zoneState.zones.filter(nonDeleted).sort(sortByEdit);


export const selectSelectedZone = (state: AppState) => {
  let allZones = state.zoneState.zones;
  let selectedZoneId = state.zoneState.selectedZone;
  let selectedZone = allZones.find(
    zone => zone._id.localeCompare(selectedZoneId) == 0
  )
  return selectedZone;
}

export function zoneReducer(
  state: ZoneState = initialState,
  action: ZoneActions
) {
  switch (action.type) {

    case ZoneActionsType.ZONE_UPDATED:
      let zu = state.zones.findIndex(
        z => z._id == (<Zone>action.payload)._id
      )
      if (zu != -1) {
        let cd = state.zones.slice();
        cd.splice(zu, 1, <Zone>action.payload);
        state = { ...state, zones: cd, selectedZone: null };
      }

      break;
    case ZoneActionsType.ZONES_LOADED:
      state = { ...state, zones: (<Zone[]>action.payload) };
      break;
    case ZoneActionsType.ZONE_ADDED:
      let cz = state.zones.slice();
      cz.push(<Zone>action.payload)
      state = { ...state, zones: cz };
      break;
    case ZoneActionsType.ZONE_DELETED:
      let zd = state.zones.findIndex(
        z => z._id == action.payload
      )
      if (zd != -1) {
        let cd = state.zones.slice();
        cd.splice(zd, 1);
        state = { ...state, zones: cd, selectedZone: null };
      }

      break;
    case ZoneActionsType.PLACES_LOADED:
      state = { ...state, places: (<PlacesLoaded>action).payload };
      break;
    case ZoneActionsType.PROVINCES_LOADED:
      state = { ...state, provinces: (<PlacesLoaded>action).payload };
      break;
    case ZoneActionsType.DISTRICTS_LOADED:
      state = { ...state, districts: (<PlacesLoaded>action).payload };
      break;
    case ZoneActionsType.TOWNS_LOADED:
      state = { ...state, towns: (<PlacesLoaded>action).payload };
      break;
    case ZoneActionsType.SELECT_ZONE:
      state = { ...state, selectedZone: <string>action.payload }
      break;
    case ZoneActionsType.SET_ZONE_CATEGORY:
      state = { ...state, category: <CollaborationStatusEnum>action.payload }
      break;
  }
  return state;
}
