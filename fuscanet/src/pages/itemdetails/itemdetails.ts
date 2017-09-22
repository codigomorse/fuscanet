import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Product } from '../../models/product';

@Component({
  selector: 'page-itemdetails',
  templateUrl: 'itemdetails.html',
})

export class Itemdetails {
  product:Dictionary;
  titulo;
  datos;
  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.product=this.navParams.data;
    this.titulo=this.product.$key;
    console.log(this.product);
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  keys() : Array<string> {
    console.log(this.product);
    return Object.keys(this.product);
  }
  
}
interface Dictionary {
  [ index: string ]: string
}
