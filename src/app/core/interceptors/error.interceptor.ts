import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error desconocido';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        switch (error.status) {
          case 404:
            errorMessage = 'No se encontró el recurso solicitado';
            break;
          case 500:
            errorMessage = 'Error interno del servidor';
            break;
          case 401:
            errorMessage = 'No está autorizado para realizar esta acción';
            break;
          case 403:
            errorMessage = 'Acceso denegado';
            break;
          default:
            errorMessage = `Error ${error.status}: ${error.message}`;
        }
      }

      notificationService.showError(errorMessage);
      return throwError(() => errorMessage);
    })
  );
}; 