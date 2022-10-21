import { DaysOfWeek } from './days-of-week.enum';
export interface Horaire {
  _id?: string,
  edited?: string,
  day?: DaysOfWeek,
  startTime?: string,
  endTime?: string
}
