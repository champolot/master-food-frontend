import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'mf-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent extends MzBaseModal implements OnInit {
  message: string;

  constructor() {
    super();
  }

  setMessage(message: string) {
    this.message = message;
  }


  ngOnInit() {
  }
}
