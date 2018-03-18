import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading,LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Profile } from '../../models/profile';
import { User } from "../../models/user";
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Component({
  selector: 'page-register-cel',
  templateUrl: 'register-cel.html',
})
export class RegisterCel {
  profile = {} as Profile;
  user = {} as User;
  public loading:Loading;
  public createForm:FormGroup;
  constructor(public loadingCtrl: LoadingController,public alertCtrl: AlertController,private afDb: AngularFireDatabase,private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    this.createForm = formBuilder.group({
      cel:['',Validators.compose([Validators.minLength(9) ,Validators.required,Validators.maxLength(9),Validators.required])],
    });
  }

  ionViewDidLoad() {
    this.profile = this.navParams.get('profile');
  }
  createUser(): void {
    this.profile.perfil="nuevo";
    this.profile.created=new Date().toISOString();
    this.afAuth.auth.createUserWithEmailAndPassword(this.profile.correo, 
        this.profile.password)
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
      console.log('este se graba cuando se crea',this.profile);
        this.afDb.object(`profile/${auth.uid}`).set(this.profile).then(() => {
            let alert = this.alertCtrl.create({
              title: 'Aviso',
              subTitle: 'Muchas gracias por completar su registro junto a yo medico.\nLuego de verificar su informacion recibira un mensaje para poder acceder a la aplicacion'
            });
            alert.present();
        this.navCtrl.push(LoginPage);
      });
      })
  }
}
