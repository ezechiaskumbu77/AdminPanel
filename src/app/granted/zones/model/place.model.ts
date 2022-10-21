import { CollaborationStatusEnum } from 'src/app/model/collaboration-status.enum';

export interface Place {
  _id?: string,
  name?: string,
  code?: string,
  parent?: string,
  fullName?: string,
  midName?: string,
}
