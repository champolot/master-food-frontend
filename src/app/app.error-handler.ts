import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorDialogComponent } from './shared/messages/error-dialog/error-dialog.component';
import { NotificationService } from './shared/messages/notification.service';


@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  errorDialog: ErrorDialogComponent;
  constructor(private notificationService: NotificationService) {
    super();
  }


  handleError(errorResponse: HttpErrorResponse | any) {
    // tslint:disable-next-line:triple-equals
    if (errorResponse == 'Error: The selector "mf-error-dialog" did not match any elements') {
      return;
    }
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;

      switch (errorResponse.status) {
        case 401:
          this.notificationService.errorNotify('EXIBIR  PAGINA DE LOGIN AQUI/ IMPORT LOGIN');
          break;
        case 403:
          this.notificationService.errorNotify(message || 'Não Autorizado');
          break;
        case 404:
          this.notificationService.errorNotify(message || 'Recurso não encontrado');
          break;
      }
      this.notificationService.errorNotify(message);
      return;
    }
    this.notificationService.errorNotify(errorResponse);
  }


}
