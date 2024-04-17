import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {  //ناخد توكين لما يكون في يوزر بس
          return next.handle(req);
        }
        const modifiedReq = req.clone({
        params: new HttpParams().set('auth', user.token!)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
