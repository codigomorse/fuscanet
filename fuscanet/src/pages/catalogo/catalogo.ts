import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Product } from '../../models/product';
import { Itemdetails } from '../itemdetails/itemdetails';
import { Labdetails } from '../labdetails/labdetails';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html'
})
export class Catalogo {
  user={};
  items:any;
  labs:any;
  principios:any;
  origProd:any;
  productos$: FirebaseListObservable<Product[]>;
  origLab:any;
  laboratorios$: FirebaseListObservable<Product[]>;
  origPrincipio:any;
  principio$: FirebaseListObservable<Product[]>;

  constructor(private storage: Storage,public loadingCtrl: LoadingController,public alertCtrl: AlertController,private modalCtrl:ModalController, private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando productos...'
    });
  
    loading.present();

    //this.bajarProductos();
    this.usarDatosLocales();

    loading.dismiss();
    
  }
  bajarProductos(){
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.productos$ = this.afDb.list('product');
      this.productos$.subscribe(data => {
        this.origProd=data;
        this.storage.set('products',this.origProd);
        // storage.get('products').then((val) => {
        //  console.log('productos ',val);
        // });
        this.laboratorios$ = this.afDb.list('laboratory');
        this.laboratorios$.subscribe(lab =>{
            this.origLab=lab;
            this.storage.set('laboratory',this.origLab);
            // storage.get('laboratory').then((lab) => {
            //  console.log('labs ',lab);
            // });
            //loading.dismiss();
            //console.log(this.origLab);
            this.principio$ = this.afDb.list('principio_activo');
            this.principio$.subscribe(prin =>{
              this.origPrincipio=prin;
              this.storage.set('principio_activo',this.origPrincipio);
              // storage.get('principio_activo').then((prin) => {
              //  console.log('principios',prin);
              // });
              
            })
          }
        )
        //console.log("se cargo");
        //loading.dismiss();
      });
     }); 
  }
  usarDatosLocales(){
        this.storage.get('products').then((val) => {
          //console.log(val);
          this.origProd=val;
          console.log(this.origProd);
        });
  }
  initializeItems() {
    this.items= this.origProd;
  }
  initializeLabs() {
    this.labs= this.origLab;
  }
  initializePrinc() {
    this.principios= this.origPrincipio;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        console.log(item.$key);
        console.log(val);
        return (item.$key.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  getPrinc(ev: any) {
    // Reset items back to all of the items
    this.initializePrinc();

    // set val to the value of the searchbar
    let val = ev.target.value;
    console.log(this.principios);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.principios = this.principios.filter((prin) => {
        return (prin.$key.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    console.log(this.principios);
  }
  getLabs(ev: any) {
    // Reset items back to all of the items
    this.initializeLabs();

    // set val to the value of the searchbar
    let val = ev.target.value;
    
    //console.log(this.labs);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.labs = this.labs.filter((lab) => {
        return (lab.$key.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  productClick(product){
    let modal = this.modalCtrl.create(Itemdetails,  {'product': product});
    //modal.onDidDismiss((data) => {console.log(data)});
    modal.present();
    
  }
  labClick(lab){
    let modal = this.modalCtrl.create(Labdetails,  {'lab': lab, 'origProd': this.origProd});
    //modal.onDidDismiss((data) => {console.log(data)});
    modal.present();
    
  }
}
