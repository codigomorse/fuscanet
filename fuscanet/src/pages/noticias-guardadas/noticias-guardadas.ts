import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController,Content, NavParams, AlertController,Platform, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { Event } from '../../models/event';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable  } from 'angularfire2/database';
import * as moment from 'moment';
import { Eventdetails } from '../eventdetails/eventdetails';

@Component({
  selector: 'page-noticias-guardadas',
  templateUrl: 'noticias-guardadas.html',
})
export class NoticiasGuardadas {
  user={};
  profile = {} as Profile;
  events: FirebaseListObservable<Event[]>;
  noticiaList: Event[];
  noticias: FirebaseListObservable<Profile[]>;

  constructor(private modalCtrl:ModalController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public alert: AlertController,public platform: Platform,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      //TRAE LOS DATOS DEL USUARIO
      this.user = data;
      //console.log(this.user);
      //TRAE EL PROFILE DEL USUARIO  
      this.afDb.object(`/profile/${data.uid}`).subscribe(_data => {
          this.profile = _data;
          //console.log(this.profile);
      });
      this.afDb.object(`/noticiaList/${data.uid}`).subscribe(_data => {
        //console.log("esto hay");  
        //console.log(_data);
        try{
        _data.forEach(element => {
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
          //console.log(element);
        });
        //console.log(_data);
        this.noticiaList = _data;  
        console.log(this.noticiaList);
      }catch(e){console.log("event list vacio")}
      });
     });
  }
  olvidar(noticia){
    //alert("olvidar noticia");
    let posNot = this.getNoticiaPosition(noticia);
    //console.log(posNot);
    if(posNot != -1){
      this.noticiaList.splice(posNot, 1);
    }
    //console.log(this.eventSource);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`noticiaList/${auth.uid}`).set(this.noticiaList).then(() => alert("La noricia se olvido correctamente correctamente"));
    })
  }
  getNoticiaPosition(noticia){
    let cont =0;
    let dev = -1;
    this.noticiaList.forEach(element => {
      element.startTime= moment(noticia.startTime).format();
      element.endTime= moment(noticia.endTime).format();
      //console.log('compara '+element.title+element.startTime +' con '+event.title+event.startTime);
      if(element.title==noticia.title && element.startTime==noticia.startTime){
        //console.log(cont);
        dev = cont;
      }
      //console.log(cont);
      cont ++;
    });
    return dev; 
  }
}
