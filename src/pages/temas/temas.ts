import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThemeProvider } from '../../providers/theme/theme';

/**
 * Generated class for the TemasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-temas',
  templateUrl: 'temas.html',
})
export class TemasPage {
  theme: string = 'light';
  customscss: string;

  constructor(public navCtrl: NavController
 	 , public navParams: NavParams
 	 , public themes: ThemeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TemasPage');
  }

  toggleAppTheme() {
    if (this.theme === 'light') {
      this.themes.setActiveTheme('light-theme');
    } else if (this.theme === 'dark') {
      this.themes.setActiveTheme('dark-theme');
    } else {
      this.themes.setActiveTheme(this.customscss);
    }
  }
}
