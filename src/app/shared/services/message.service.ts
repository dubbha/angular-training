import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  private message: string;
  private type: string;
  private callback: Function;

  constructor() {}

  getMessage() {
    return this.message;
  }

  getType() {
    return this.type;
  }

  getCallback() {
    return this.callback;
  }

  setMessage(message) {
    this.message = message;
  }

  setType(type) {
    this.type = type;
  }

  setCallback(fn: Function) {
    this.callback = fn;
  }

  set(message, type = 'info', callback = null) {
    this.setMessage(message);
    this.setType(type);
    if (callback && typeof callback === 'function') {
      this.setCallback(callback);
    }
  }
}
