import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '../../services';
import { Type } from './type.enum';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  message: string;
  callback: Function;
  cancelCallback: Function;
  type = Type.Alert;
  style = 'info';

  constructor(
    private router: Router,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.message = this.modalService.getMessage();
    this.type = this.modalService.getType();
    this.style = this.modalService.getStyle();
    this.callback = this.modalService.getCallback();
    this.callback = this.modalService.getCallback();

    if (!this.message) {  // route reloaded with (modal:display) part but no message
      this.close();
    }
  }

  ok() {
    this.close();
    if (typeof this.callback === 'function') {
      this.callback();
    }
  }

  cancel() {
    this.close();
    if (typeof this.cancelCallback === 'function') {
      this.cancelCallback();
    }
  }

  close() {
    this.router.navigate([{ outlets: { modal: null }}]);
  }
}
