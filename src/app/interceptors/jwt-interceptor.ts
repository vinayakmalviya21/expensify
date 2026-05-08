import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  if (token) {

    req = req.clone({

      setHeaders: {

        Authorization: `Bearer ${token}`

      }

    });

  }

  return next(req);

};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {

      // 🔥 TOKEN EXPIRED / INVALID
      if (error.status === 401) {

        localStorage.clear();

        router.navigate(['/']);

      }

      // 🔥 FORBIDDEN
      if (error.status === 403) {

        alert("Access Denied");

      }

      return throwError(() => error);

    })

  );

};