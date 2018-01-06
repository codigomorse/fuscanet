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
    //me fijo si hay productos
    storage.get('principio_activo').then((prin) => {
        this.usarDatosLocales();
    });
  }
  bajarProductos(){
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
        console.log('fb ',this.origProd);
        //console.log(JSON.stringify(this.origProd));
        this.origProd.forEach(element => {
          element.nombre = element.$key;
          //console.log(element.$key);
          //console.log(element.nombre);
        });
        this.storage.set('products',this.origProd);
        this.storage.get('products').then((val) => {
         console.log('productos ',val);
        });
        this.laboratorios$ = this.afDb.list('laboratory');
        this.laboratorios$.subscribe(lab =>{
            this.origLab=lab;
            this.origLab.forEach(element => {
              element.nombre = element.$key;
              //console.log(element.$key);
              //console.log(element.nombre);
            });
            this.storage.set('laboratory',this.origLab);
            // storage.get('laboratory').then((lab) => {
            //  console.log('labs ',lab);
            // });
            //loading.dismiss();
            //console.log(this.origLab);
            this.principio$ = this.afDb.list('principio_activo');
            this.principio$.subscribe(prin =>{
              this.origPrincipio=prin;
              this.origPrincipio.forEach(element => {
                element.nombre = element.$key;
                //console.log(element.$key);
                //console.log(element.nombre);
              });
              this.storage.set('principio_activo',this.origPrincipio);
              // storage.get('principio_activo').then((prin) => {
              //  console.log('principios',prin);
              // });
              loading.dismiss();
            })
          }
        )
        //console.log("se cargo");
        //loading.dismiss();
      });
     }); 
  }
  usarDatosLocales(){
    let loading = this.loadingCtrl.create({
      content: 'Cargando productos...'
    });
    loading.present();
        this.storage.get('products').then((val) => {
          //console.log('productos locales',val);
          this.origProd=val;
          //console.log('para filtrar ',this.origProd);
          if(this.origProd[0].nombre){
            alert(this.origProd[0].nombre)
          }else{
            alert('no hay nada');
            this.bajarProductos();
          }
        });
        this.storage.get('laboratory').then((val) => {
          //console.log('productos locales',val);
          this.origLab=val;
          //console.log('para filtrar ',this.origProd);
        });
        this.storage.get('principio_activo').then((val) => {
          //console.log('productos locales',val);
          this.origPrincipio=val;
          //console.log('para filtrar ',this.origProd);
          loading.dismiss();
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
        //console.log(item.nombre);
        //console.log(val);
        return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
        return (prin.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
        return (lab.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
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
