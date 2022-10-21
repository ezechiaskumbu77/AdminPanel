import { Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { customEnvironment } from 'src/environments/custom-environment';

@Pipe({
  name: 'townsFromProvince'
})
export class TownsFromProvincePipe implements PipeTransform {

  public static networkCall$: BehaviorSubject<boolean | null>;
  public static countObserver$: BehaviorSubject<number>;
  private static networkActivitysCount: number = 0;

  constructor(private _http: HttpClient) {
    TownsFromProvincePipe.networkCall$ = new BehaviorSubject<boolean>(null);
    TownsFromProvincePipe.networkActivitysCount = 0;
    TownsFromProvincePipe.countObserver$ = new BehaviorSubject<number>(0);
  }

  transform(value: any, ...args: any[]): any {

    let val = new BehaviorSubject<any>(null);
    if (args[0].localeCompare("data") == 0) {
      TownsFromProvincePipe.networkActivitysCount++;
      TownsFromProvincePipe.countObserver$.next(TownsFromProvincePipe.networkActivitysCount);
      if (TownsFromProvincePipe.networkActivitysCount == 1) TownsFromProvincePipe.networkCall$.next(true);
      this._http.get(customEnvironment.BASE_URL + '/place/?parent=' + value).pipe(map((resp: any) => resp.data)).subscribe(
        (v) => {

          TownsFromProvincePipe.networkActivitysCount--;
          if (TownsFromProvincePipe.networkActivitysCount == 0) TownsFromProvincePipe.networkCall$.next(null)
          TownsFromProvincePipe.countObserver$.next(TownsFromProvincePipe.networkActivitysCount);
          val.next(v)
        }
      )
    }

    if (args[0].localeCompare("network") == 0) {
      return TownsFromProvincePipe.networkCall$;
    } else if (args[0].localeCompare("data") == 0)
      return val
    else return TownsFromProvincePipe.countObserver$;
  }

}
