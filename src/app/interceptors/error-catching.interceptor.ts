import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updatedRequest = this.updateRequest(request);

    console.log('Passed through the interceptor in request');

    return next.handle(updatedRequest).pipe(
      map(res => {
        console.log('Passed through the interceptor in response');
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Client side error');
          errorMsg = `Error: ${error.message}`;
        } else {
          console.log('Server side error');
          errorMsg = `Error code: ${error.status}, Message:${error.message}`;
        }
        console.log(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  updateRequest(request: HttpRequest<unknown>) {
    return request.clone({
      setHeaders: {
        Authentication: 'My Authentication'
      }
    });
  }
}
