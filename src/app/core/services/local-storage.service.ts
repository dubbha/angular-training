import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class LocalStorageService {
  private storage: any;

  constructor(
    private windowRefService: WindowRefService,
  ) {
    this.storage = windowRefService.nativeWindow.localStorage;
  }

  getItem(keyName): any {
    return JSON.parse(this.storage.getItem(keyName));
  }

  setItem(keyName, keyValue): void {
    this.storage.setItem(keyName, JSON.stringify(keyValue));
  }

  removeItem(keyName): void {
    this.storage.removeItem(keyName);
  }

  clear(): void {
    this.storage.clear();
  }
}
