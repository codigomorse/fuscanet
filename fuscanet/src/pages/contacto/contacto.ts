import { Component } from '@angular/core';
import { IonicPage, NavController,Content, NavParams, AlertController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})
export class Contacto {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contacto');
  }

}
