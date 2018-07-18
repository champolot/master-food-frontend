import { Component, OnInit } from '@angular/core';
import { MzModalService } from 'ngx-materialize';
import { ErrorDialogComponent } from '../../shared/messages/error-dialog/error-dialog.component';
import { NotificationService } from '../../shared/messages/notification.service';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mf-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }




}
