import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,Content, NavParams, AlertController, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { Event } from '../../models/event';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable  } from 'angularfire2/database';
import * as moment from 'moment';
import { Eventdetails } from '../eventdetails/eventdetails';
import { User } from '../user/user';


@Component({
  selector: 'page-beneficios',
  templateUrl: 'beneficios.html',
})
export class Beneficios {
  user={};
  convenios;
  conveniosToShow;

  constructor(private modalCtrl:ModalController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public alert: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      this.afDb.object(`/convenio/${data.uid}`).subscribe(_data => {
        this.convenios = this.afDb.list('convenio');
        this.convenios.subscribe(data => this.creoLocal(data));
      });
    });
  }
  creoLocal(events){
    this.conveniosToShow=[];
    events.forEach(element => {
        //console.log(this.conveniosToShow);
        //console.log(element);
        this.conveniosToShow.push(element);
    });
  }
  showDetails(event){
    //console.log(event);
    let modal = this.navCtrl.push(Eventdetails,  {'event': event});
    //modal.onDidDismiss((data) => {console.log(data)});
    //modal.present();
  }
}
