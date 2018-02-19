import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class SessionStorageService {
  private storage: any;

  constructor(
    private windowRefService: WindowRefService,
    private localStorageService: LocalStorageService,
  ) {
    this.storage = windowRefService.nativeWindow.sessionStorage;
    this.shareSessionBetweenTabs();
  }

  getItem(keyName): any {
    return JSON.parse(this.storage.getItem(keyName));
  }

  setItem(keyName, keyValue): void {
    this.storage.setItem(keyName, JSON.stringify(keyValue));
    this.notifyOtherTabs();
  }

  removeItem(keyName): void {
    this.storage.removeItem(keyName);
    this.notifyOtherTabs();
  }

  clear(): void {
    this.storage.clear();
    this.notifyOtherTabs();
  }

  notifyOtherTabs() { // send current sessionStorage dump to other tabs
    const storageDump = {};
    for (let i = 0; i < this.storage.length; i++) {
      storageDump[this.storage.key(i)] = this.storage.getItem(this.storage.key(i));
    }
    this.localStorageService.setItem('sessionStorage', storageDump);  // notify other tabs by sending a localStorage event
    this.localStorageService.removeItem('sessionStorage');  // clear the data from localStorage right away
  }

  shareSessionBetweenTabs() {
    if (!this.storage.length) { // initial sessionStorage is empty in this tab, ask for the initial session data from other tabs
      localStorage.setItem('getSessionStorage', `${Date.now()}`);
    }

    this.windowRefService.nativeWindow.addEventListener('storage', (event) => {
      if (event.key === 'getSessionStorage') {  // another tab asked for the initial sessionStorage dump, send it
        this.notifyOtherTabs();
      } else if (event.key === 'sessionStorage' && event.newValue) {   // another tab sent the sessionStorage dump
        const data = JSON.parse(event.newValue);
        this.storage.clear();
        Object.keys(data).forEach(key => this.storage.setItem(key, data[key]));
      }
    });
  }
}
