import { User } from '../user/login/model/user.model';

export interface RatingItem {
  quotation?: number,
  byUser?: User,
  comment?: string
}
