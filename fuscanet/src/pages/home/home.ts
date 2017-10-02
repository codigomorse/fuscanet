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
  events: FirebaseListObservable<Profile[]>;
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
  asistir(){
    console.log("click añadir");
    let event= {startTime: "2017-09-27T12:35:50-03:00", endTime: "2017-09-27T12:35:50-03:00", allDay: false, title: "evento 1"};
    //console.log(event);
    //console.log(event.title);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDb.object(`events/${event.title}`).set(event).then(() => alert("Fue confirmada tu asistencia"));
    })
  }
}
