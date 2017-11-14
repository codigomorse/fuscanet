import { Component } from '@angular/core';
import { IonicPage, NavController,Content, NavParams, AlertController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-acerca-de',
  templateUrl: 'acerca-de.html',
})
export class AcercaDe {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcercaDe');
  }

}
