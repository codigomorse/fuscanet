import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Loading,LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class User {
  profileData: FirebaseObjectObservable<Profile>;
  user={};
  profile = {} as Profile;

  constructor(public alertCtrl: AlertController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.afDb.object(`/profile/${data.uid}`).subscribe(_data => {
          this.profile = _data;
          console.log(this.profile);
      });  
     });
  }

}
