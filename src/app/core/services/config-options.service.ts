import { Injectable } from '@angular/core';

@Injectable()
export class ConfigOptionsService {
  private configOptions = {};

  init(configOptions) {
    this.configOptions = configOptions;
    return this;  // make .init() chainable
  }

  set(optionKey, optionValue): void {
    this.configOptions[optionKey] = optionValue;
  }

  get(optionKey): any {
    return this.configOptions[optionKey];
  }

  getAll(): object {
    return this.configOptions;
  }
}
