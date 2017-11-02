import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Product } from '../../models/product';
import { Itemdetails } from '../itemdetails/itemdetails';

@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html'
})
export class Catalogo {
  user={};
  items:any;
  origProd:any;
  productos$: FirebaseListObservable<Product[]>;

  constructor(public loadingCtrl: LoadingController,public alertCtrl: AlertController,private modalCtrl:ModalController, private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando productos...'
    });
  
    loading.present();

    this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.productos$ = this.afDb.list('product');
      this.productos$.subscribe(data => {
        this.origProd=data;
        console.log("se cargo");
        loading.dismiss();
      });
     }); 
  }
  initializeItems() {
    this.items= this.origProd;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.$key.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  productClick(product){
    let modal = this.modalCtrl.create(Itemdetails,  {'product': product});
    //modal.onDidDismiss((data) => {console.log(data)});
    modal.present();
    
  }

}
