import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Product } from '../../models/product';

@Component({
  selector: 'page-labdetails',
  templateUrl: 'labdetails.html',
})
export class Labdetails {
  lab:Dictionary;
  titulo;
  datos;
  origProd:any;

  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams) {
    this.lab=this.navParams.get('lab');
    console.log(this.lab);
    console.log(this.lab.$key);
    this.titulo=this.lab.$key;
    this.origProd=this.navParams.get('origProd');
    console.log(this.origProd);
    this.origProd=this.origProd.filter((product)=>{
      //console.log(product.Laboratorio);
      return product.Laboratorio.startsWith(this.lab.$key);
    });
    console.log(this.origProd);
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }
  keys() : Array<string> {
    return Object.keys(this.lab);
  }
  
}
interface Dictionary {
  [ index: string ]: string
}