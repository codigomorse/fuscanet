import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, ModalController } from 'ionic-angular';
import { Product } from '../../models/product';
import { Itemdetails } from '../itemdetails/itemdetails';

@Component({
  selector: 'page-labdetails',
  templateUrl: 'labdetails.html',
})
export class Labdetails {
  lab:Dictionary;
  titulo;
  datos;
  origProd:any;

  constructor(public navCtrl: NavController,public viewCtrl:ViewController, public navParams: NavParams,private modalCtrl:ModalController) {
    this.lab=this.navParams.get('lab');
    //console.log(this.lab);
    //console.log(this.lab.$key);
    this.titulo=this.lab.nombre;
    this.origProd=this.navParams.get('origProd');
    //console.log(this.origProd);
    this.origProd=this.origProd.filter((product)=>{
      //console.log(product.Laboratorio);
      return product.Laboratorio.startsWith(this.lab.nombre);
    });
    //console.log(this.origProd);
  }
  productClick(product){
    let modal = this.modalCtrl.create(Itemdetails,  {'product': product});
    //modal.onDidDismiss((data) => {console.log(data)});
    modal.present();
    
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