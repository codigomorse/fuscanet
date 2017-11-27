import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';
@Component({
  selector: 'page-beneficios',
  templateUrl: 'beneficios.html',
})
export class Beneficios {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Beneficios');
  }

}
