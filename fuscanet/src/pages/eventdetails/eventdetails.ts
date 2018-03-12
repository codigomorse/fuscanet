import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Event } from '../../models/event';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html',
})
export class Eventdetails {
  titulo;
  evento: Event;
  constructor(public viewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth) {
    this.evento=this.navParams.get('event');
    //console.log(this.evento);
  }


  closeModal(){
    this.viewCtrl.dismiss();
  }
  goLink(event){
    console.log(event);
    this.afAuth.authState.take(1).subscribe(auth => {
      //console.log(auth);  
      this.afDb.database.ref(`noticiaLike/${event.id}`).push(auth.uid);
    });
  }
}
