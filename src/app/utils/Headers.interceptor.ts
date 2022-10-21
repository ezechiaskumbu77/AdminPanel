import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError } from 'rxjs/operators';
import { AppState } from '../app.state';
import { CancelProgress, SetProgress } from '../globale-store/global.actions';
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers
      .set('Content-Type', 'application/json')
    let token = localStorage.getItem('token');
    if (token != null)
      headers = headers.set('Authorization', 'Bearer ' + token);
    const newReq = req.clone({ headers: headers });
    return next.handle(newReq).pipe(
      tap((evt) => {
        if (evt.type == 0) {
          this.store.dispatch(new SetProgress)

        }
        if (evt.type == 4) {
          this.store.dispatch(new CancelProgress)

        }
        return evt
      }),
      catchError((response) => {
        console.log("HTTP Error occured ", response);
        this.store.dispatch(new CancelProgress);
        return throwError(response);
      }))
  }
}
