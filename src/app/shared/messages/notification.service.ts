import { EventEmitter } from '@angular/core';

export class NotificationService {
  messageNotifier = new EventEmitter<string>();

  errorNotifier = new EventEmitter<string>();


  errorNotify(message: string) {
    this.errorNotifier.emit(message);
  }

  messageNotify(message: string) {
    this.messageNotifier.emit(message);
  }
}
