import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { Event } from '../../models/event';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable  } from 'angularfire2/database';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  profileData: FirebaseObjectObservable<Profile>;
  user={};
  eventSource: Event[];
  events: FirebaseListObservable<Event[]>;
  noticias: FirebaseListObservable<Profile[]>;
  profile = {} as Profile;
  constructor(private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public alert: AlertController,public platform: Platform,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.afDb.object(`/profile/${data.uid}`).subscribe(_data => {
          this.profile = _data;
          //console.log(this.profile);
      });
      this.afDb.object(`/events/${data.uid}`).subscribe(_data => {
        this.events = this.afDb.list('events');
        //this.events.subscribe(data => console.log(data));  
      });
      this.afDb.object(`/noticia`).subscribe(_data => {
        this.noticias = this.afDb.list('noticia');
        //this.noticias.subscribe(data => console.log(data));  
      });
      this.afDb.object(`/eventlist/${data.uid}`).subscribe(_data => {
        //console.log("esto hay");  
        //console.log(_data);
        try{
        _data.forEach(element => {
          //console.log(element);
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
        });
        //console.log(_data[0].startTime);
        this.eventSource = _data;  
      }catch(e){console.log("event list vacio")}
      });  
     });
  }
  logoutUser(){
        let alert = this.alert.create({
        title: 'Confirm',
        message: 'Do you want sing out and exit?',
        buttons: [{
          text: "sing out and exit?",
          handler: () => { this.exitApp() }
        }, {
          text: "Cancel",
          role: 'cancel'
        }]
      })
      alert.present();
  }
  exitApp(){
    firebase.auth().signOut();
    this.platform.exitApp();
  }
  goNoticia(){
    console.log("click");
  }
  asistir(event){
    console.log("click añadir");
    //console.log(this.eventSource);
    this.formatTime(this.eventSource);
    //console.log(event.title);
    try{
    let asiste = this.asiste( event);
    console.log(asiste);
    if(asiste){
      alert("ya asistiras a este evento");
    }else{
      this.eventSource.push( event);
      //alert("se agrega el evento")
      console.log(this.eventSource);
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDb.object(`eventlist/${auth.uid}`).set(this.eventSource).then(() => alert("El evento se agrego correctamente"));
      })
    }}catch(e){
      this.eventSource = [];
      this.eventSource.push(event);
      //alert("se agrega el evento")
      console.log(this.eventSource);
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDb.object(`eventlist/${auth.uid}`).set(this.eventSource).then(() => alert("El evento se agrego correctamente"));
      })
    }
  }
  formatTime(events){
    try{
    events.forEach(event => {
      //console.log(event);
      //console.log("format time");
      event.startTime= moment(event.startTime).format();
      event.endTime= moment(event.endTime).format();
      //console.log(event);
    });}catch(e){}
  }
  asiste(event){
    let asistira = false;
    try{this.eventSource.forEach(element => {
        //console.log('compara '+element.title+' con '+event.title);
        if(element.title==event.title && element.startTime==event.startTime){
          asistira = true;
        }
    });}catch(e){}
    //console.log('retorna '+asistira);
    return asistira;
  }
}
