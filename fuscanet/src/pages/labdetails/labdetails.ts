import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Product } from '../../models/product';

@Component({
  selector: 'page-labdetails',
  templateUrl: 'labdetails.html',
})
export class Labdetails {
  product:Dictionary;
  titulo;
  datos;
  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams) {
    this.product=this.navParams.get('product');
    console.log(this.product);
    this.titulo=this.product.$key;
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
  keys() : Array<string> {
    return Object.keys(this.product);
  }
  
}
interface Dictionary {
  [ index: string ]: string
}