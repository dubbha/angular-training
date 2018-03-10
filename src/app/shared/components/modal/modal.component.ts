import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../../+store';
import * as RouterActions from '../../../+store/actions/router.actions';

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
    private store: Store<AppState>,
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
    this.close().then(() => {
      if (typeof this.callback === 'function') {
        this.callback();
      }
    });
  }

  cancel() {
    this.close().then(() => {
      if (typeof this.cancelCallback === 'function') {
        this.cancelCallback();
      }
    });
  }

  close() {
    return Promise.resolve(
      this.store.dispatch(new RouterActions.Go({ path: [{ outlets: { modal: null } }] }))
    );
  }

  get isTypeAlert() {
    return this.type === Type.Alert;
  }

  get isTypeConfirm() {
    return this.type === Type.Confirm;
  }
}
