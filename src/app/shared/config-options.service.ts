import { Injectable } from '@angular/core';

@Injectable()
export class ConfigOptionsService {
  private configOptions: object;

  constructor(configOptions = {}) {
    this.configOptions = configOptions;
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
