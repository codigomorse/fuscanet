import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,Loading,LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class User {
  profileData: FirebaseObjectObservable<Profile>;
  user={};
  profile = {} as Profile;
  public createForm:FormGroup;
  public loading:Loading;

  constructor(public alertCtrl: AlertController,public formBuilder: FormBuilder,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.createForm = formBuilder.group({
      email: [''],
      cel: [''],
      especialidad: [''],
      city: [''],
      sociedad: [''],
      gender: [''],
    });
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.user = data;
      //console.log(this.user);  
      this.afDb.object(`/profile/${data.uid}`).subscribe(_data => {
          this.profile = _data;
          console.log("perfil cuando entra");
          console.log(this.profile);
      });  
     });
  }
  updateUser(){
    this.afAuth.authState.take(1).subscribe(auth => {
      console.log("perfil a guardar");
      console.log(this.profile);
        this.afDb.object(`profile/${auth.uid}`).set(this.profile).then(() => alert("Datos actualizados correctamente"));
      })
  }

}
