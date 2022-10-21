import { BehaviorSubject } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
const MINUTE_MILLIS = 60 * 1000;
@Pipe({
  name: 'commandDurationToIcon'
})
export class CommandDurationToIconPipe implements PipeTransform {



  transform(value: any, ...args: any[]): any {
    let iconSet: {
      icon: string
      color: string
      minutes: number
    } = {
      icon: 'hourglass_full',
      color: 'badge-success',
      minutes: 0
    };

    let iconSet$ = new BehaviorSubject<any>(iconSet);
    let parent = this;
    setInterval(
      () => {
        parent._evaluateValues(value, args, iconSet$)
      }
      ,
      1 * 1000
    )


    return iconSet$
  }

  private _evaluateValues(value: any, args, sub: BehaviorSubject<any>) {
    let iconSet: {
      icon: string
      color: string
      minutes: number
    } = {
      icon: 'hourglass_full',
      color: 'badge-success',
      minutes: 0
    };

    let made = new Date(value);
    if (made != undefined) {
      let mins = Math.trunc(((new Date().getTime() - made.getTime()) / MINUTE_MILLIS));
      iconSet.minutes = mins
      if (mins > args[0]) {
        iconSet.icon = 'hourglass_full';
        iconSet.color = 'badge-warning';
      }
      if (mins > args[1]) {
        iconSet.icon = 'hourglass_empty';
        iconSet.color = 'badge-danger'
      }
    }
    sub.next(iconSet)
  }

}
