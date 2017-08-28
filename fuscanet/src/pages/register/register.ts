import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  profileData: FirebaseObjectObservable<Profile>;
  profile = {} as Profile;
  user = {} as User;
  public createForm:FormGroup;
  public loading:Loading;
  constructor(private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public formBuilder: FormBuilder,public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    this.createForm = formBuilder.group({
      email: [''],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])],
      nombre:['', Validators.compose([Validators.required])],
      apellido:['', Validators.compose([Validators.required])],
      cedula:['', Validators.compose([Validators.minLength(8),Validators.maxLength(8),Validators.required])],
      cel:['', Validators.compose([Validators.minLength(9),Validators.maxLength(9),Validators.required])],
    });
  }

  ionViewDidLoad() {
    
  }
  createUser(): void {
    console.log(this.user);
    console.log(this.profile);
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, 
        this.user.password)
    .then( authData => {
      this.loading.dismiss().then( () => {
        this.saveProfile();
        //console.log(authData);
        this.afAuth.auth.signOut;

        this.navCtrl.pop();
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
  saveProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
        this.afDb.object(`profile/${auth.uid}`).set(this.profile).then(() => alert("El usuario fue enviado a procesar correctamente"));
      })
  } 
}
