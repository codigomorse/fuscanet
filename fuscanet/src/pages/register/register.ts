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
  testCheckboxOpen: boolean;
  testCheckboxResult;
  especialidad;
  public createForm:FormGroup;
  public loading:Loading;
  constructor(private afAuth:AngularFireAuth,public formBuilder: FormBuilder,public navCtrl: NavController,public alertCtrl: AlertController, public navParams: NavParams,public loadingCtrl: LoadingController) {
    this.createForm = formBuilder.group({
      email: [''],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])],
      nombre:['', Validators.compose([Validators.required])],
      apellido:['', Validators.compose([Validators.required])],
      matricula:['', Validators.compose([Validators.required])],
      especialidad:[''],
      cel:['', Validators.compose([Validators.minLength(9),Validators.required])],
    });
  }

  ionViewDidLoad() {
  }
  createUser(): void {

    alert('tu vieja');
  } 
}
