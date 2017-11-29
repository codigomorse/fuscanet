import { Component } from '@angular/core';
import { IonicPage, NavController,Content, NavParams, AlertController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-splash2',
  templateUrl: 'splash2.html',
})
export class Splash2 {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      // this.navCtrl.popToRoot();
      // might try this instead
      this.navCtrl.pop();
  }, 2000);
  }

}
