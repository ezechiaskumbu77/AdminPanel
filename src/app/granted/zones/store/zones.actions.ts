import { Zone } from './../model/zone.model';
import { ZoneState } from './zones.reducer';
import { Actions } from '@ngrx/effects';
import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { Place } from '../model/place.model';

export enum ZoneActionsType {
  LOAD_ZONES = "[zone] load",
  LOAD_PLACES = "[place] load",
  LOAD_TOWNS = "[town] load",
  LOAD_DISTRICTS = "[district] load",
  LOAD_PROVINCES = "[province] load",
  ZONES_LOADED = "[zone] loaded",
  PLACES_LOADED = "[place] loaded",
  PROVINCES_LOADED = "[provinces] loaded",
  DISTRICTS_LOADED = "[districts] loaded",
  TOWNS_LOADED = "[towns] loaded",
  ADD_ZONE = "[zone] add",
  ZONE_ADDED = "[zone] added",
  UPDATE_ZONE = "[zone] update",
  ZONE_UPDATED = "[zone] updated",
  DELETE_ZONE = "[zone] delete",
  ZONE_DELETED = "[zone] deleted",
  SELECT_ZONE = "[zone] select",
  SET_ZONE_CATEGORY = "[zone] set category"
}

export class ZoneUpdated {
  readonly type: string = ZoneActionsType.ZONE_UPDATED
  constructor(public payload: Zone) { }
}

export class UpdateZone {
  readonly type: string = ZoneActionsType.UPDATE_ZONE
  constructor(public payload: Zone) { }
}

export class ZoneDeleted {
  readonly type: string = ZoneActionsType.ZONE_DELETED
  constructor(public payload: string) { }
}

export class DeleteZone {
  readonly type: string = ZoneActionsType.DELETE_ZONE
  constructor(public payload: string) { }
}

export class ZoneAdded {
  readonly type: string = ZoneActionsType.ZONE_ADDED
  constructor(public payload: Zone) { }
}

export class AddZone {
  readonly type: string = ZoneActionsType.ADD_ZONE
  constructor(public payload: Zone) { }
}

export class LoadProvinces {
  readonly type: string = ZoneActionsType.LOAD_PROVINCES
  constructor(public payload: string) { }
}

export class LoadDistricts {
  readonly type: string = ZoneActionsType.LOAD_DISTRICTS
  constructor(public payload: string) { }
}

export class LoadTowns {
  readonly type: string = ZoneActionsType.LOAD_TOWNS
  constructor(public payload: string) { }
}

export class LoadPlaces {
  readonly type: string = ZoneActionsType.LOAD_PLACES
  constructor(public payload: string) { }
}

export class ProvincesLoaded {
  readonly type: string = ZoneActionsType.PROVINCES_LOADED

  constructor(public payload: Place[]) {
  }
}

export class DistrictsLoaded {
  readonly type: string = ZoneActionsType.DISTRICTS_LOADED

  constructor(public payload: Place[]) {
  }
}


export class TownsLoaded {
  readonly type: string = ZoneActionsType.TOWNS_LOADED

  constructor(public payload: Place[]) {
  }
}

export class PlacesLoaded {
  readonly type: string = ZoneActionsType.PLACES_LOADED

  constructor(public payload: Place[]) {
  }
}

export class SetZoneCategory {
  readonly type: string = ZoneActionsType.SET_ZONE_CATEGORY
  constructor(public payload: CollaborationStatusEnum) { }
}

export class SelectZone {
  readonly type: string = ZoneActionsType.SELECT_ZONE
  constructor(public payload: string) { }
}

export class LoadZones {
  readonly type: string = ZoneActionsType.LOAD_ZONES
  constructor(public payload: string) { }
}

export class ZonesLoaded {
  readonly type: string = ZoneActionsType.ZONES_LOADED

  constructor(public payload: Zone[]) {
  }
}

export type ZoneActions =
  LoadZones
  | ZonesLoaded
  | SelectZone
  | SetZoneCategory
  | LoadPlaces
  | PlacesLoaded
  | LoadProvinces
  | LoadDistricts
  | LoadTowns
  | ProvincesLoaded
  | DistrictsLoaded
  | TownsLoaded
  | AddZone
  | ZoneAdded
  | DeleteZone
  | ZoneDeleted
  | UpdateZone
  | ZoneUpdated
