import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Platform } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable  } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  profileData: FirebaseObjectObservable<Profile>;
  user={};
  eventSource=[];
  events: FirebaseListObservable<Profile[]>;
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
        _data.forEach(element => {
          //console.log(element);
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
        });
        //console.log(_data[0].startTime);
        this.eventSource = _data;  
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
    console.log(event);
    console.log(this.eventSource);
    if(this.eventSource.indexOf(event) != -1){
      console.log("ya asistiras a este evento");
    }else{
      this.eventSource.push(event);
    }
    console.log(this.eventSource);
    this.afAuth.authState.take(1).subscribe(auth => {
      //this.afDb.object(`eventlist/${auth.uid}`).update(this.eventSource).then(() => alert("El evento se agrego correctamente"));
    })
  }
}
