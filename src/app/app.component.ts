import { Component, OnInit, Type } from '@angular/core';
import { MzModalService, MzBaseModal } from 'ngx-materialize';
import { NotificationService } from './shared/messages/notification.service';
import { ErrorDialogComponent } from './shared/messages/error-dialog/error-dialog.component';

@Component({
  selector: 'mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mf';
  /*
  Servico de dialog de erros presentes na aplicacao
  */
  constructor(private modalService: MzModalService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService.errorNotifier.subscribe(message => {
      const errorDialog = this.modalService.open(ErrorDialogComponent);
      (<ErrorDialogComponent>errorDialog.instance).setMessage(JSON.stringify(message));
    });
  }

}
