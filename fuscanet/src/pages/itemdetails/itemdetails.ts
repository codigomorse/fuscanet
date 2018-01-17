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
    this.product=this.navParams.get('product');
    //console.log(this.product);
    this.titulo=this.product.nombre;
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