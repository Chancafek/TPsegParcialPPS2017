import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class ThemeProvider {

  private theme: BehaviorSubject<String>;

  constructor(private storage: Storage) {
    this.theme = new BehaviorSubject('light-theme');
    this.setStoredTheme();
  }

  setActiveTheme(val) {
    this.theme.next(val);
    this.storage.set('theme', val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

  setStoredTheme() {
    this.storage.get('theme').then((val) => {
      if (val != null)
      {
        this.setActiveTheme(val);
      }
    });
  }

}