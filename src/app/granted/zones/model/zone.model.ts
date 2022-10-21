import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';
import { Place } from './place.model';

export interface Zone {
  _id?: string,
  name?: string,
  idDeleted?: boolean;
  priceSurcast?: number,
  priceSurcem?: number,
  listPlace?: Place[]
}
