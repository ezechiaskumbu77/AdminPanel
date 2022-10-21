import { Pipe, PipeTransform } from '@angular/core';
import { DaysOfWeek } from '../model/days-of-week.enum';

@Pipe({
  name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {

  transform(value: DaysOfWeek, ...args: any[]): boolean {
    let today = new Date().getDay();
    return today == this._getNumeralFromDayString(value);
  }

  _getNumeralFromDayString(ds: DaysOfWeek): number {
    let numeral = 0;
    switch (ds) {
      case DaysOfWeek.MONDAY:
        numeral = 1
        break;
      case DaysOfWeek.TUESDAY:
        numeral = 2
        break;
      case DaysOfWeek.WEDNESDAY:
        numeral = 3
        break;
      case DaysOfWeek.TUESDAY:
        numeral = 4
        break;
      case DaysOfWeek.FRIDAY:
        numeral = 5
        break;
      case DaysOfWeek.SATURDAY:
        numeral = 6
        break;
    }
    return numeral;
  }

}
