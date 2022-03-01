import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError, of } from 'rxjs';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updatedRequest = this.updateRequest(request);

    return next.handle(updatedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.log('Server side error');
          errorMsg = `Error code: ${error.status}, Message:${error.error.message}`;
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
