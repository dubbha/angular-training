import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Type } from '../components/modal/type.enum';

@Injectable()
export class ModalService {
  private message: string;
  private type: Type;
  private style: string;
  private callback: Function;
  private cancelCallback: Function;

  constructor(
    private router: Router,
  ) {}

  getMessage(): string {
    return this.message;
  }

  getType(): Type {
    return this.type;
  }

  getStyle(): string {
    return this.style;
  }

  getCallback(): Function {
    return this.callback;
  }

  setMessage(message): void {
    this.message = message;
  }

  setType(type: Type): void {
    this.type = type;
  }

  setStyle(style) {
    this.style = style;
  }

  setCallback(fn: Function): void {
    this.callback = fn;
  }

  setCancelCallback(fn: Function): void {
    this.cancelCallback = fn;
  }

  alert(message, conf?: { style: string, callback: Function }) {
    this.setType(Type.Alert);
    this.setMessage(message);
    if (conf && conf.style && typeof conf.style === 'string') {
      this.setStyle(conf.style);
    }
    if (conf && conf.callback && typeof conf.callback === 'function') {
      this.setCallback(conf.callback);
    }
    this.router.navigate([{ outlets: { modal: ['display'] } }]);
  }

  confirm(message, conf?: { style: string, callback: Function, cancelCallback: Function }) {
    this.setType(Type.Confirm);
    this.setMessage(message);
    if (conf && conf.style && typeof conf.style === 'string') {
      this.setStyle(conf.style);
    }
    if (conf && conf.callback && typeof conf.callback === 'function') {
      this.setCallback(conf.callback);
    }
    if (conf && conf.cancelCallback && typeof conf.cancelCallback === 'function') {
      this.setCancelCallback(conf.cancelCallback);
    }
    this.router.navigate([{ outlets: { modal: ['display'] } }]);
  }
}
