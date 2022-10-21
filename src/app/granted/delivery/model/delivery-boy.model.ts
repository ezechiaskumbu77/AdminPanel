import { Horaire } from './../../../model/horaire.model';
import { RatingItem } from './../../../model/rating-item.model';
import { DeliveryCorp } from './delivery-corp.model';
import { HistoricalItem } from 'src/app/model/historical-item';
import { User } from 'src/app/user/login/model/user.model';
import { CollaborationStatusEnum } from '../../../model/collaboration-status.enum';
import { Zone } from '../../zones/model/zone.model';
import { FolderItem } from 'src/app/model/folder-item';
export interface DeliveryBoy {
  _id?: string,
  edited?: string
  idDeleted?: boolean,
  userID?: User,
  horairedeservice?: Horaire,
  status?: CollaborationStatusEnum,
  historical?: HistoricalItem,
  avaliability?: boolean,
  permis?: string,
  createdBy?: User,
  boyOwner?: DeliveryCorp,
  zone?: Zone,
  indepedant?: boolean,
  folder?: FolderItem,
  rating?: RatingItem[]
}



export interface Permis {
  imageUrl?: string,
  octroiDate?: string,
  expireDate?: string
}
