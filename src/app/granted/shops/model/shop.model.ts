import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';

export interface Shop {
  _id?: string,
  name?: string,
  shopOnwer?: string,
  geoLoc?: GeoLoc,
  shopManager?: string,
  place?: string,
  horairedeservice?: Schedule,
  capacity?: number,
  address?: string,
  status?: CollaborationStatusEnum
}

export interface GeoLoc {
  lat: number,
  long: number
}

export interface Schedule {
  day?: string
  startTime?: string
  endTime?: string
}
