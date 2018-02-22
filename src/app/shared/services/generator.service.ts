import { Injectable } from '@angular/core';

@Injectable()
export class GeneratorService {
  private length = 4;

  init(length) {
    this.length = length;
    return this;  // make .init() chainable
  }

  generate() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let result = '';
    for (let i = 0; i < this.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return result;
  }
}
