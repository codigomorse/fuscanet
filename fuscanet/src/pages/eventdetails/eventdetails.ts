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
    var self = this;
    this.afAuth.authState.take(1).subscribe(auth => {
      //console.log(event.id);
      //console.log(auth.uid);
      this.afDb.database.ref(`noticiaLike/${event.id}`).once('value').then(function(snapshot) {
        //creo la lista vacia
        //console.log(snapshot.val());
        var noticiasLeidas=[];
        noticiasLeidas = snapshot.val();
        //console.log('antes ',noticiasLeidas);
        //tengo q fijarme si ya esta en la lista
        //agrego el usuario a la lista
        let agregar = true;
        if(noticiasLeidas){
          noticiasLeidas.forEach(element => {
            if(element==auth.uid){
              //agregar = false;
            }
          });
        }else{
          var noticiasLeidas=[];
        }
        if(agregar){
          //console.log('agregate ',auth.uid );
          //console.log('aca ', noticiasLeidas);
          noticiasLeidas.push(auth.uid);
        }
        //console.log('despues ',noticiasLeidas);
        //guardo la lista en la bd
        self.afDb.database.ref(`noticiaLike/${event.id}`).set(noticiasLeidas);
        //llevo al detalle
        let modal = self.navCtrl.push(Eventdetails,  {'event': event});
      });
    });
  }
}
