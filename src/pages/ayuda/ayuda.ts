import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, MenuController } from 'ionic-angular';

/**
 * Generated class for the AyudaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  @ViewChild(Slides) slides: Slides;
  skipMsg = 'Entendido'
  state: string = 'x';

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
  ) {

  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  skip() {
    this.navCtrl.pop();
  }

  slideChanged() {
    if (this.slides.isEnd())
      this.skipMsg = "Cerrar Ayuda";
  }

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex())
      this.state = 'rightSwipe';
    else
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }

}
