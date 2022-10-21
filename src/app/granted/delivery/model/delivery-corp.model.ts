import { FolderItem } from 'src/app/model/folder-item';
import { CollaborationStatusEnum } from './../../../model/collaboration-status.enum';
export interface DeliveryCorp {
  _id?: string,
  ownerUser?: string,
  entrepriseInfo?: EntrepriseInfo,
  deliverBoys?: string[],
  deliverCars?: string[],
  status?: CollaborationStatusEnum
}
export interface EntrepriseInfo {
  name: string,
  address: string,
  idna: string,
  numeroImpot: string,
  rccm: string,
  folder: FolderItem[]
}

