import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  user = {} as User;
  public createForm:FormGroup;
  public loading:Loading;
  constructor(private afAuth:AngularFireAuth,public formBuilder: FormBuilder,public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController) {
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
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, 
        this.user.password)
    .then( authData => {
      this.loading.dismiss().then( () => {
        alert("se creo esta mierda");
        this.afAuth.auth.signOut;

        //this.navCtrl.setRoot('Home');
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
}
